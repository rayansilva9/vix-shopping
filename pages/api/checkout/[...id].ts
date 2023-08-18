import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import client from '../../../lib/mongo'
import { v4 as uuidv4 } from 'uuid'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const idSession = uuidv4()
    const itemParse = {
      id: idSession,
      name: req.query.id[3] as string,
      quantidade: req.query.id[1] as string,
      variedade: req.query.id[2] as string,
      valor_pago: req.query.id[4] as string
    }
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: req.query.id[0] as string,
            quantity: req.query.id[1] as unknown as number,
            adjustable_quantity: { enabled: true, maximum: 10, minimum: 1 }
          }
        ],
        metadata: {
          idSession: idSession
        },
        payment_intent_data: {
          metadata: {
            idSession: idSession
          }
        },
        billing_address_collection: 'required',
        mode: 'payment',
        success_url: `https://localhost/success?session_id=${req.headers.origin}`,
        cancel_url: `https://localhost/canceled?session_id=${req.headers.origin}`
      })
      await client.connect()
      const db = client.db('admin-loja')
      const coll = db.collection('payments-intents')
      await coll.insertOne({
        id: idSession,
        ammount_received: session.amount_total,
        createdAt: session.created,
        currency: session.currency,
        status: 'pendente',
        items: [itemParse]
      })

      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
