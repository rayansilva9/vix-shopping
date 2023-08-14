import { NextApiRequest, NextApiResponse } from 'next'
import { FieldValue, db } from '../../../lib/firebase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const querySnapshot = await db
        .collection('products')
        .where('id', '==', req.query.data[0])
        .get()

      const doc = querySnapshot.docs[0] // Pega o primeiro documento retornado
      const desejoField = doc.data().desejos
      const exists: boolean = desejoField.includes(req.query.data[1])
      console.log(desejoField)
      if (!exists) {
        await db
          .collection('products')
          .doc(req.query.data[2].trim())
          .update({
            desejos: FieldValue.arrayUnion(req.query.data[1])
          })

        res.status(200).json({ exists: false }) // Envia a resposta JSON com o comprimento
      } else {
        await db
          .collection('products')
          .doc(req.query.data[2].trim())
          .update({
            desejos: FieldValue.arrayRemove(req.query.data[1])
          })

        res.status(200).json({ exists: true }) // Retorna 0 se nenhum documento for encontrado
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message }) // Retorna o erro como JSON
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
