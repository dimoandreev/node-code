import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // Check if user already exists
        const existingUser = await this.usersRepository.findOne({
            where: [
                { email: createUserDto.email },
                { username: createUserDto.username },
            ],
        });

        if (existingUser) {
            throw new ConflictException('Email or username already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        // Create new user
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return await this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'username', 'password', 'createdAt', 'updatedAt'],
        });
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.usersRepository.findOne({
            where: { username },
        });
    }

    async findById(id: string): Promise<User | null> {
        return await this.usersRepository.findOne({
            where: { id },
        });
    }
}
