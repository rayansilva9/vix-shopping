export default interface productPropsCategory {
  produto: {
    id: string
    docId: string
    optVal: [
      {
        name: string
        pid: number
        values: [
          {
            image: string
            name: string
            propTips: string
            vid: number
          }
        ]
      }
    ]
    name: string
    category: string
    photos: string[]
    priceId: string
    precoOriginal: number
    inCardBy: number
    totalPedidos: number
    rating: number
    precos: { brl: string; usd: string; eur: string }
    feedback: []
    descPrevia: string
    desc: string
  }[]
}
