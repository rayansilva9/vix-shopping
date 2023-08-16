import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/mongo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await client.connect()
      const db = client.db('loja')
      const coll = db.collection('produtos')

      const queryResult = await coll.findOne({ id: req.query.id })

      if (queryResult) {
        const desejoField = queryResult.desejos || []
        const length = desejoField.length
        console.log(desejoField)

        res.status(200).json({ length }) // Envia a resposta JSON com o comprimento
      } else {
        res.status(404).json({ length: 0 }) // Retorna 0 se nenhum documento for encontrado
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message }) // Retorna o erro como JSON
    } finally {
      await client.close()
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
