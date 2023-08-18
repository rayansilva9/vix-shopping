import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import client from '../../../lib/mongo'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log(req.headers.origin)
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: req.query.id[0] as string,
            quantity: req.query.id[1] as unknown as number,
            adjustable_quantity: { enabled: true, maximum: 10, minimum: 1 }
          }
        ],
        metadata: {
          tipos: req.query.id[2] as string
        },
        payment_intent_data: {
          metadata: {
            // Add your metadata key-value pairs here
            tipos: req.query.id[2] as string
          }
        },
        billing_address_collection: 'required',
        mode: 'payment',
        success_url: `https://localhost/success?session_id=${req.headers.origin}`,
        cancel_url: `https://localhost/canceled?session_id=${req.headers.origin}`
      })
      await client.connect()
      const db = client.db('admin-loja')
      const coll = db.collection('payment-intents')

      await coll.insertOne({
        id: session.id,
        ammount_received: session.amount_total,
        createdAt: session.created,
        currency: session.currency,
        status: 'criado'
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
