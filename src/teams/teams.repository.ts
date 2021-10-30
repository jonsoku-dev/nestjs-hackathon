import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Team } from './teams.schema';
import { CreateTeamRequestDto } from './dto/create.team.request.dto';
import { EditTeamRequestDto } from './dto/edit.team.request.dto';
import { UserCurrentDto } from '../users/dto/user.current.dto';

@Injectable()
export class TeamsRepository {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  async findAll() {
    return this.teamModel.find();
  }

  async findById(teamId: string | Types.ObjectId): Promise<Team | null> {
    return this.teamModel.findById(teamId);
  }

  async create(
    team: CreateTeamRequestDto,
    user: UserCurrentDto,
  ): Promise<Team> {
    const newTeam = new this.teamModel({
      ownerId: user._id,
      ownerName: user.username,
      name: team.name,
    });
    return await newTeam.save();
  }

  async findByIdAndUpdate(
    teamId: string | Types.ObjectId,
    body: EditTeamRequestDto,
  ): Promise<Team | null> {
    const team = await this.teamModel.findByIdAndUpdate(teamId, body, {
      new: true,
    });
    return team;
  }

  async findByIdAndDelete(
    teamId: string | Types.ObjectId,
  ): Promise<Team | null> {
    const team = await this.teamModel.findByIdAndDelete(teamId);
    return team;
  }
}
