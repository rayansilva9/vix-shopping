import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/mongo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await client.connect()
      const db = client.db('loja')
      const coll = db.collection('produtos')

      const product = await coll.findOne({ id: req.query.data[0] })

      if (!product) {
        res.status(404).json({ exists: false }) // Produto não encontrado
        return
      }

      const desejoField = product.desejos || []
      const exists = desejoField.includes(req.query.data[1])

      if (!exists) {
        await coll.updateOne(
          { _id: product._id },
          { $addToSet: { desejos: req.query.data[1] } }
        )

        res.status(200).json({ exists: false }) // Produto não estava na lista de desejos
      } else {
        await coll.updateOne(
          { _id: product._id },
          { $pull: { desejos: req.query.data[1] } }
        )

        res.status(200).json({ exists: true }) // Produto estava na lista de desejos
      }
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
