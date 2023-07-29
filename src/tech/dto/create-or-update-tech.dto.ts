import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateTechDto {

    @IsNotEmpty()
    @IsString()
    name: string;
}