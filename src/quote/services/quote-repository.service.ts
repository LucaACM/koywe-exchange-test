import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { BaseDatabaseService } from 'src/common/shared/infraestructure/database/abstract-database.service';
import { Quote } from '../model/quote.model';
import { CreateQuoteDto } from '../controller/dto/create-quote.dto';
import { randomUUID } from 'crypto';
import axios from 'axios';
import { ExchangeApiResponse } from '../interfaces/exchange-api-response.interface';
import Big from 'big.js';

@Injectable()
export class QuoteRepositoryService extends BaseDatabaseService<Quote> {
  private readonly FIVE_MINUTES = 1000 * 60 * 5;
  private readonly EXCHANGE_RATE_API_URL = 'https://api.exchange.cryptomkt.com/api/3/public/price/rate';
  constructor(
    @InjectModel(Quote.name)
    readonly quoteModel: Model<Quote>,
  ) {
    super(quoteModel);
  }

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {

    const response = await this.getExchangeRate(createQuoteDto.from, createQuoteDto.to);
    const {timestamp, price} = response[createQuoteDto.from];

    const exchangeRate = price;

    const convertedAmount = Big(createQuoteDto.amount).times(Big(exchangeRate)).toNumber();

    const creationObject: Quote = {
      ...createQuoteDto,
      convertedAmount,
      timestamp: new Date(timestamp),
      isDeleted: false,
      expiresAt: new Date(Date.now() + this.FIVE_MINUTES),
      identifier: randomUUID(),
      exchangeRate,
    };
    return this.create(creationObject);
  }

  buildQuery(query: Partial<Quote>): FilterQuery<Quote> {
    const filter: FilterQuery<Quote> = {
      isDeleted: false,
      expiresAt: { $gt: new Date() },
      ...(query.identifier && { identifier: query.identifier }),
    };
    return filter;
  }

  async getExchangeRate(from: string, to: string): Promise<ExchangeApiResponse> {
    const url = `${this.EXCHANGE_RATE_API_URL}?from=${from}&to=${to}`;
    const response = await axios.get(url);
    return response.data;
  }
}

