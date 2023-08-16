import { setCookie } from 'nookies'
import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/mongo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await client.connect()
    const db = client.db('loja')
    let usuario = JSON.parse(req.query.data[1])
    let usuarioDecoded = {
      username: usuario.username,
      email: usuario.email,
      photo: decodeURIComponent(usuario.photo), // Codificar a URL antes de passar como parâmetro
      number: usuario.phoneNumber,
      uid: usuario.uid,
      doc: ''
    }
    const querySnapshot = await db
      .collection('users')
      .find({ uid: req.query.data[0] })
      .toArray()

    if (querySnapshot.length > 0) {
      const doc = querySnapshot[0]
      setCookie(undefined, 'US', JSON.stringify(doc), {
        maxAge: 60 * 60 * 24 * 365 // 1 ano
      })
    } else {
      // Nenhum documento com o uid foi encontrado
      const result = await db.collection('users').insertOne(usuarioDecoded)
      usuarioDecoded.doc = result.insertedId.toString()

      setCookie(undefined, 'US', JSON.stringify(usuarioDecoded), {
        maxAge: 60 * 60 * 24 * 365 // 1 ano
      })
    }
    res.status(200).json({ exists: true }) //
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
