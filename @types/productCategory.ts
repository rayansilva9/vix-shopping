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
    precoAvenda: number
    feedback: []
    descPrevia: string
    desc: string
  }[]
}
