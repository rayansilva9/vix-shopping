import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import client from '../../../lib/mongo'
import { v4 as uuidv4 } from 'uuid'

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

  const idSession = uuidv4()

  const p = JSON.parse(req.query.id[2] as unknown as string)
  const item = p.map(e => ({
    name: e.name,
    quantidade: e.quantity,
    variedade: e.tipos,
    valor_pago: e.prico
  }))
  console.log(item)
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

      const db = client.db('admin-loja')
      const coll = db.collection('payments-intents')
      await coll.insertOne({
        id: idSession,
        ammount_received: session.amount_total,
        createdAt: session.created,
        currency: session.currency,
        status: 'pendente',
        items: item,
        adress: ''
      })

      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }

    await client.connect()
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
