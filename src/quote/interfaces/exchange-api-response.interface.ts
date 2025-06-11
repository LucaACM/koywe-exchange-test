import { CurrencyCode } from "src/common/enums/currency-code.enum";

export type ExchangeApiResponse = {
  [K in CurrencyCode]: {
    currency: CurrencyCode;
    price: number;
    timestamp: string;
  };
};