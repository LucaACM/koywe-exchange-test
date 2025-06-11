import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { CurrencyCode } from "src/common/enums/currency-code.enum";

export class CreateQuoteDto {
    @ApiProperty({
        description: 'Currency code to convert from',
        example: 'USD',
        enum: CurrencyCode,
        enumName: 'CurrencyCode',
        required: true,
    })
    @IsNotEmpty()
    @IsEnum(CurrencyCode, { message: 'Invalid from currency code' })
    from: CurrencyCode

    @ApiProperty({
        description: 'Currency code to convert to',
        example: 'EUR',
        enum: CurrencyCode,
        enumName: 'CurrencyCode',
        required: true,
    })
    @IsNotEmpty()
    @IsEnum(CurrencyCode, { message: 'Invalid to currency code' })
    to: CurrencyCode

    @ApiProperty({
        description: 'Amount to convert',
        example: 100,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    amount: number
}