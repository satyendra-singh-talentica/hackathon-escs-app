import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateHPDto {

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    doclink: string;

    @IsNotEmpty()
    @IsString()
    tech: string;
}