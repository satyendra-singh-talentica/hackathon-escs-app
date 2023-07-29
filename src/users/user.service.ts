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

    createUsers(data) {

        const users = data.map(e => {
            const newUser = new User();
            newUser.employeeId = parseInt(e["Employee ID"], 10);
            newUser.name = e["Name"];
            newUser.email = e["Email"];
            newUser.phone = null;
            newUser.gender = null;
            newUser.designation = e["Current Designation"];
            newUser.github = null;
            let now = new Date();
            const fromEarlierTime = now.setFullYear(now.getFullYear() - (parseInt(e["Years Of Experience"], 10)));
            newUser.dateOfJoining = new Date(fromEarlierTime);
            return newUser;
        });
        return this.userRepo.save(users);
    }

    getUsers() {
        return this.userRepo.find();
    }

    getUser(email: string) {
        return this.userRepo.findOneBy({ email });
    }
}
