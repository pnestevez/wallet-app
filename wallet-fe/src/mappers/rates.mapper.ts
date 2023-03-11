import { APIRate, TRate } from "../contracts/rate.contract";
import rateMapper from "./rate.mapper";

const ratesMapper = {
  toFront: (data: APIRate[]): TRate[] => 
    data.map(r => rateMapper.toFront(r))
}

export default ratesMapper