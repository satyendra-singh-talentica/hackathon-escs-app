import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateUserDto {

    @IsNotEmpty()
    @IsInt()
    employeeId: number;

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    gender: number;

    @IsNotEmpty()
    @IsString()
    designation: string;

    @IsOptional()
    @IsString()
    github: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    dateOfJoining: Date;

    @IsOptional()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    dateOfBirth: Date;

}