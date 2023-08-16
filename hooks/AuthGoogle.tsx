import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { setCookie } from 'nookies'
import { NextApiRequest, NextApiResponse } from 'next'
// import client from '../../../lib/mongo'

export const AuthGoogle = () => {
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
          photo: encodeURIComponent(user.photoURL),
          number: user.phoneNumber,
          uid: user.uid,
          doc: ''
        }

        setCookie(undefined, 'US', JSON.stringify(usuario), {
          maxAge: 60 * 60 * 24 * 365 // 1 ano
        })

        try {
          const response = await fetch(
            '/api/findUser/' + usuario.uid + '/' + JSON.stringify(usuario),
            { method: 'POST' }
          )
          if (response.ok) {
            window.location.reload()
          } else {
            console.error('Erro ao fazer login')
          }

          window.location.reload()
        } catch (error) {
          console.error(error)
        } finally {
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
  } finally {
  }
}
