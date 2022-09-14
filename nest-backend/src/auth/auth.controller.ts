import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Put, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService
    ) {
        
    }

    @Post('admin/register')
    async register(
        @Body() body: RegisterDto
    ) { 
        const { password_confirm, ...data } = body;

        if (body.password !== body.password_confirm) { 
            throw new BadRequestException('Passwords do not match');
        }

        const hashed = await bcrypt.hash(body.password, 12);

        return this.userService.save({
            ...data,
            password: hashed
        });
    }

    @Post('admin/login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.userService.findOneBy({ email });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Invalid password');
        }

        const jwt = await this.jwtService.signAsync({
            id: user.id,
            scope: 'admin'
        })

        response.cookie('jwt', jwt, { httpOnly: true });

        return {message: 'success'};
    }
    
    @UseGuards(AuthGuard)
    @Get('admin/user')
    async user(@Req() request: Request)
    {
        const cookie = request.cookies['jwt'];

        const { id } = await this.jwtService.verifyAsync(cookie);

        if (request.path === '/api/admin/user') {
            return this.userService.findOne({ where: { id } });
        }

        const user = await this.userService.findOne({
            where: { id } 
        });

        const { password, ...data } = user;

        return {
            ...user
        }
    }
    
    @UseGuards(AuthGuard)
    @Post('admin/logout')
    async logout(@Res({passthrough: true}) response: Response) { 
        response.clearCookie('jwt');
        return {message: 'success'};
    }

    @UseGuards(AuthGuard)
    @Put('admin/users/info')
    async updateProfile(
        @Req() request: Request,
        @Body('first_name') first_name: string,
        @Body('last_name') last_name: string,
        @Body('email') email: string,
    ) {
        const cookie = request.cookies['jwt'];

        const { id } = await this.jwtService.verifyAsync(cookie);

        await this.userService.update(id, {
            first_name,
            last_name,
            email
        });

        return this.userService.findOne({ where: { id } });
    }

    @UseGuards(AuthGuard)
    @Put('admin/users/password')
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ) {
        const cookie = request.cookies['jwt'];

        const { id } = await this.jwtService.verifyAsync(cookie);

        await this.userService.update(id, {
            password: await bcrypt.hash(password, 12)
        });

        return this.userService.findOneBy({ id });
    }

    @UseGuards(AuthGuard)
    @Get('admin/users')
    async users() {
        const users = await this.userService.findAll();
        if (!users) {
            throw new NotFoundException('User not found');
        }

        return users;
    }
}
