import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/mongo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await client.connect()
      const db = client.db('loja')
      const coll = db.collection('produtos')
      const cursor = coll.find({})
      const docs = await cursor.toArray() // Correção: usar await para aguardar a conclusão da operação

      res.status(200).json({ docs })
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    } finally {
      await client.close() // Certifique-se de fechar a conexão após a operação
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}
