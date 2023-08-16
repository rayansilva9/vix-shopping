import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb' // Importe ObjectId do pacote mongodb
import client from '../../../lib/mongo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await client.connect()
      const db = client.db('loja')
      const coll = db.collection('produtos')

      const objectId = req.query.id // Pega o ObjectId da query da URL
      const filter = { _id: new ObjectId(objectId as unknown as ObjectId) } // Cria um filtro para buscar o documento pelo ObjectId

      const doc = await coll.findOne(filter) // Busca o documento usando o filtro

      if (!doc) {
        res.status(404).json({ message: 'Documento não encontrado' })
      } else {
        res.status(200).json({ doc })
      }
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    } finally {
      await client.close()
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}
