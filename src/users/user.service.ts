import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    createUser(dto) {
        const newUser = new User();
        newUser.employeeId = dto.employeeId;
        newUser.name = dto.name;
        newUser.email = dto.email;
        newUser.phone = dto.phone;
        newUser.gender = dto.gender;
        newUser.designation = dto.designation;
        newUser.github = dto.github;
        newUser.dateOfJoining = dto.dateOfJoining;
        newUser.dateOfBirth = dto.dateOfBirth;
        return this.userRepo.save(newUser);
    }

    getUsers() {
        return this.userRepo.find();
    }

    getUser(email: string) {
        return this.userRepo.findOneBy({ email });
    }
}
