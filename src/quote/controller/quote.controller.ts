import {
    Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiResponse } from 'src/common/shared/interfaces/response.interface';
import { QuoteApplicationService } from '../services/quote-application.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from '../model/quote.model';

@ApiTags('quotes')
@ApiBearerAuth('JWT')
@Controller('quotes')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QuoteController {
  constructor(
    private readonly quoteApplicationService: QuoteApplicationService,
  ) {}

  @Get(':identifier')
  async findOne(@Param('identifier') identifier: string): Promise<ApiResponse<Quote>> {
    const quote = await this.quoteApplicationService.getOneQuote(identifier);
    return {
      status: 200,
      data: quote,
    };
  }

  @Post()
  async createQuote(@Body() createQuoteDto: CreateQuoteDto): Promise<ApiResponse<Quote>> {
    const quote = await this.quoteApplicationService.createQuote(createQuoteDto);
    return {
      status: 201,
      data: quote,
    };
  }
}
