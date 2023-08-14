import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/firebase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const querySnapshot = await db
        .collection('products')
        .where('id', '==', req.query.id)
        .get()

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0] // Pega o primeiro documento retornado
        const desejoField = doc.data().desejos

        const length = desejoField.length

        res.status(200).json({ length }) // Envia a resposta JSON com o comprimento
      } else {
        res.status(404).json({ length: 0 }) // Retorna 0 se nenhum documento for encontrado
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message }) // Retorna o erro como JSON
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
