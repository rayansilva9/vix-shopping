import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const produtos = JSON.parse(req.query.id[0] as unknown as string)
  const variedades = JSON.parse(req.query.id[1] as unknown as string)

  const objeto = {
    metadata: {}
  }

  variedades.metadata.forEach((item, index) => {
    objeto.metadata[`data${index}`] = item.data
  })

  function createPayDinamic() {
    let pay = {
      line_items: [],
      metadata: {},
      payment_intent_data: {
        metadata: {}
      },
      billing_address_collection: 'required',
      mode: 'payment',
      success_url: `https://localhost/success?session_id=${req.headers.origin}`,
      cancel_url: `https://localhost/canceled?session_id=${req.headers.origin}`
    }

    pay.line_items = produtos.map(e => ({
      price: e.price,
      quantity: e.quantity,
      adjustable_quantity: { enabled: true, maximum: 10, minimum: 1 }
    }))

    pay.metadata = objeto.metadata
    pay.payment_intent_data.metadata = objeto.metadata

    return pay
  }

  if (req.method === 'POST') {
    try {
      console.log(req.headers.origin)
      //@ts-ignore
      const session = await stripe.checkout.sessions.create(createPayDinamic())
      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
