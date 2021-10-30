import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TeamsRepository } from '../teams.repository';
import { CreateTeamRequestDto } from '../dto/create.team.request.dto';
import { UsersRepository } from '../../users/users.repository';
import { EditTeamRequestDto } from '../dto/edit.team.request.dto';

@Injectable()
export class TeamsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly teamsRepository: TeamsRepository,
  ) {}

  async getAllTeam() {
    return this.teamsRepository.findAll();
  }

  async create(userId: string, body: CreateTeamRequestDto) {
    const validatedUser =
      await this.usersRepository.findUserByIdWithoutPassword(userId);
    if (!validatedUser) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    const newTeam = await this.teamsRepository.create(body, validatedUser);
    return newTeam;
  }

  async edit(userId: string, teamId: string, body: EditTeamRequestDto) {
    const validatedUser =
      await this.usersRepository.findUserByIdWithoutPassword(userId);
    if (!validatedUser) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    const validatedTeam = await this.teamsRepository.findById(teamId);
    if (!validatedTeam) {
      throw new NotFoundException('팀을 찾을 수 없습니다.');
    }
    if (!validatedTeam.ownerId.equals(validatedTeam.ownerId)) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    return this.teamsRepository.findByIdAndUpdate(teamId, body);
  }

  async delete(userId: string, teamId: string) {
    const validatedUser =
      await this.usersRepository.findUserByIdWithoutPassword(userId);
    if (!validatedUser) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    const validatedTeam = await this.teamsRepository.findById(teamId);
    if (!validatedTeam) {
      throw new NotFoundException('팀을 찾을 수 없습니다.');
    }
    if (!validatedTeam.ownerId.equals(validatedTeam.ownerId)) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    return this.teamsRepository.findByIdAndDelete(teamId);
  }
}
