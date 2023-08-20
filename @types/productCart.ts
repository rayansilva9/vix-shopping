export default interface productPropsCart {
  pricesId: { brl: string; usd: string; eur: string }
  // pricesId: any;
  id: string
  name: string
  photo: string
  price: { brl: string; usd: string; eur: string }
  prico: number
  nome?: string
  tipos?: string
  quantity: number
}
