import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const produtos = JSON.parse(req.query.id[0] as unknown as string)
  console.log(
    produtos.map(e => ({
      price: e.price,
      quantity: e.quantity,
      adjustable_quantity: { enabled: true, maximum: 10, minimum: 1 }
    }))
  )
  if (req.method === 'POST') {
    try {
      console.log(req.headers.origin)
      const session = await stripe.checkout.sessions.create({
        line_items: produtos.map(e => ({
          price: e.price,
          quantity: e.quantity,
          adjustable_quantity: { enabled: true, maximum: 10, minimum: 1 }
        })),
        metadata: {
          tipos: req.query.id[1] as string
        },
        payment_intent_data: {
          metadata: {
            // Add your metadata key-value pairs here
            tipos: req.query.id[1] as string
          }
        },
        billing_address_collection: 'required',
        mode: 'payment',
        success_url: `https://localhost/success?session_id=${req.headers.origin}`,
        cancel_url: `https://localhost/canceled?session_id=${req.headers.origin}`
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
// line_items: [
//   {
//     price: req.query.id[0] as string,
//     quantity: req.query.id[1] as unknown as number,
//     adjustable_quantity: { enabled: true, maximum: 10, minimum: 1 }
//   }
// ],
