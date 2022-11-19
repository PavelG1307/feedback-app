import { Review } from "../models/review";

export interface IParsedData {
    readonly total: number,
    readonly reviews: Review[] 
}

export interface IParserConfig {
    readonly limit: number,
    readonly offset: number,
    readonly chainId: number
}