export default interface productProps {
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
  photos: { pt: string[]; en: string[]; es: string[] }
  pricesId: { brl: string; usd: string; eur: string }
  precoOriginal: number
  inCardBy: number
  totalPedidos: number
  rating: number
  precos: { brl: string; usd: string; eur: string }
  feedback: []
  descPrevia: string
  desc: string
}
