import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model, Types } from 'mongoose';
import { UserCurrentDto } from './dto/user.current.dto';
import { SignupRequestDto } from './dto/signup.request.dto';
import { Team } from '../teams/teams.schema';
import { UpdateTeamRequestDto } from './dto/update.team.request.dto';
import { TeamsRepository } from '../teams/teams.repository';
import { RemoveTeamRequestDto } from './dto/remove.team.request.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findUserByIdWithoutPassword(
    userId: string,
  ): Promise<UserCurrentDto | null> {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .populate([{ path: 'team', Model: Team }]);
    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.exists({ email });
    return result;
  }

  async create(user: SignupRequestDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async findByIdAndUpdateAvatar(id: string, fileName: string) {
    const user = await this.userModel.findById(id);
    user.avatar = `http://localhost:8000/media/${fileName}`;
    const updatedUser = await user.save();
    return updatedUser.readOnlyData;
  }

  async findByIdAndUpdateTeam(id: string, team: Team): Promise<User | null> {
    const user = await this.userModel.findById(id);
    user.team = team._id;
    const updatedUser = await user.save();
    return updatedUser;
  }

  async findByIdAndRemove(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);
    user.team = null;
    const updatedUser = await user.save();
    return updatedUser;
  }
}
