import { Injectable, NotFoundException } from '@nestjs/common';
import { QuoteRepositoryService } from './quote-repository.service';
import { Quote } from '../model/quote.model';
import { CreateQuoteDto } from '../controller/dto/create-quote.dto';

@Injectable()
export class QuoteApplicationService {
  constructor(private readonly quoteRepository: QuoteRepositoryService) {}

  async getOneQuote(identifier: string): Promise<Quote> {
    const quote = await this.quoteRepository.findOne({ identifier });
    if(!quote) {
      throw new NotFoundException(`Quote with identifier ${identifier} not found`);
    }
    return quote;
  }

  async createQuote(quoteData: CreateQuoteDto): Promise<Quote> {
    const quote = await this.quoteRepository.createQuote(quoteData);
    return new Quote((quote as any).toObject());
  }
}
