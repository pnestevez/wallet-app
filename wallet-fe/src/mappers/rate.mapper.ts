import { APIRate, TRate } from "../contracts/rate.contract";

const rateMapper = {
  toFront: (data: APIRate): TRate => ({
    id: data.id,
    name: data.name,
    code: data.code,
    symbol: data.symbol,
    rate: data.rate,
  }),
  toAPI: (data: Pick<TRate, 'rate'>): Pick<APIRate, 'rate'> => ({
    rate: data.rate,
  })
}

export default rateMapper