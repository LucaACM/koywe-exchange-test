import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Quote, QuoteSchema } from "./model/quote.model";
import { QuoteController } from "./controller/quote.controller";
import { QuoteApplicationService } from "./services/quote-application.service";
import { QuoteRepositoryService } from "./services/quote-repository.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Quote.name,
        schema: QuoteSchema,
      },
    ]),
  ],
  providers: [QuoteApplicationService, QuoteRepositoryService],
  controllers: [QuoteController],
  exports: [],
})
export class QuoteModule {}