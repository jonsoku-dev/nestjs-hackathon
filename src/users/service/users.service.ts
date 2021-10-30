import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users.repository';
import { SignupRequestDto } from '../dto/signup.request.dto';
import * as bcrypt from 'bcrypt';
import { TeamsRepository } from '../../teams/teams.repository';
import { UpdateTeamRequestDto } from '../dto/update.team.request.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly teamsRepository: TeamsRepository,
  ) {}

  async signUp(body: SignupRequestDto) {
    const { email, username, password, age, description, sex } = body;
    const isUserExist = await this.usersRepository.existsByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('해당하는 유저는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      email,
      username,
      age,
      sex,
      description,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }

  // async uploadImg(user: User, files: Express.Multer.File[]) {
  //   const fileName = `users/${files[0].filename}`;
  //   console.log(fileName);
  //   const newUser = await this.usersRepository.findByIdAndUpdateImg(
  //     user.id,
  //     fileName,
  //   );
  //   console.log(newUser);
  //   return newUser;
  // }

  async getAllUser() {
    const allUser = await this.usersRepository.findAll();
    const readOnlyUsers = allUser.map((user) => user.readOnlyData);
    return readOnlyUsers;
  }

  async addTeam(id: string, request: UpdateTeamRequestDto) {
    const validatedTeam = await this.teamsRepository.findById(request.team._id);
    if (!validatedTeam) {
      throw new HttpException('team 이 존재하지 않습니다.', 404);
    }
    const updatedUser = await this.usersRepository.findByIdAndUpdateTeam(
      id,
      validatedTeam,
    );
    if (!updatedUser) {
      throw new HttpException('유저가 존재하지 않습니다. ', 404);
    }
    return updatedUser.readOnlyData;
  }

  async removeTeam(id: string, request: UpdateTeamRequestDto) {
    const validatedTeam = await this.teamsRepository.findById(request.team._id);
    if (!validatedTeam) {
      throw new HttpException('team 이 존재하지 않습니다.', 404);
    }
    const updatedUser = await this.usersRepository.findByIdAndRemove(id);
    if (!updatedUser) {
      throw new HttpException('유저가 존재하지 않습니다. ', 404);
    }
    return updatedUser.readOnlyData;
  }
}
