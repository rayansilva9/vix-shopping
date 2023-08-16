import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../../lib/firebase'
import { setCookie } from 'nookies'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/mongo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const provider = new GoogleAuthProvider()

      signInWithPopup(auth, provider)
        .then(async result => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          const user = result.user
          const usuario = {
            username: user.displayName,
            email: user.email,
            photo: user.photoURL,
            number: user.phoneNumber,
            uid: user.uid,
            doc: ''
          }

          setCookie(undefined, 'US', JSON.stringify(usuario), {
            maxAge: 60 * 60 * 24 * 365 // 1 ano
          })

          try {
            await client.connect()
            const db = client.db('loja')

            const querySnapshot = await db
              .collection('users')
              .find({ uid: user.uid })
              .toArray()

            if (querySnapshot.length > 0) {
              const doc = querySnapshot[0]
              console.log(doc)

              setCookie(undefined, 'US', JSON.stringify(doc), {
                maxAge: 60 * 60 * 24 * 365 // 1 ano
              })
            } else {
              // Nenhum documento com o uid foi encontrado
              const result = await db.collection('users').insertOne(usuario)
              usuario.doc = result.insertedId.toString()

              setCookie(undefined, 'US', JSON.stringify(usuario), {
                maxAge: 60 * 60 * 24 * 365 // 1 ano
              })
            }

            window.location.reload()
          } catch (error) {
            console.error(error)
          } finally {
            await client.close()
          }
        })
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorMessage)
          // The email of the user's account used.
          const email = error.customData.email
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error)
          // ...
        })
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message })
    } finally {
      await client.close()
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
