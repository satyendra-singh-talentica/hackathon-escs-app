import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateProjectDto {

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    client: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    tech: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    startDate: Date;

    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : null)
    endDate: Date;
}