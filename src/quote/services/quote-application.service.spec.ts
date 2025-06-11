import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { QuoteApplicationService } from './quote-application.service';
import { QuoteRepositoryService } from './quote-repository.service';
import { Quote } from '../model/quote.model';

describe('QuoteApplicationService', () => {
  let service: QuoteApplicationService;
  let repository: jest.Mocked<QuoteRepositoryService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteApplicationService,
        {
          provide: QuoteRepositoryService,
          useValue: {
            findOne: jest.fn(),
            createQuote: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(QuoteApplicationService);
    repository = module.get(QuoteRepositoryService);
  });

  describe('getOneQuote', () => {
    it('should return a quote when found', async () => {
      const quote = { identifier: 'id' } as Quote;
      (repository.findOne as jest.Mock).mockResolvedValue(quote);
      const result = await service.getOneQuote('id');
      expect(result).toBe(quote);
    });

    it('should throw when quote not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.getOneQuote('id')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('createQuote', () => {
    it('should create and return a Quote instance', async () => {
      (repository.createQuote as jest.Mock).mockResolvedValue({
        toObject: () => ({ identifier: '1' }),
      });
      const dto: any = { amount: 1 };
      const result = await service.createQuote(dto);
      expect(result).toBeInstanceOf(Quote);
      expect(repository.createQuote).toHaveBeenCalledWith(dto);
    });
  });
});
