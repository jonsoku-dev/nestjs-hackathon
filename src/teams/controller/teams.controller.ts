import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from '../service/teams.service';
import { CreateTeamRequestDto } from '../dto/create.team.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeamReadonlyDto } from '../dto/team.readonly.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { CurrentUser } from '../../common/decorators/current.user.decorator';
import { EditTeamRequestDto } from '../dto/edit.team.request.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiOperation({
    summary: '새로운 팀 생성',
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: TeamReadonlyDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() currentUser, @Body() body: CreateTeamRequestDto) {
    return this.teamsService.create(currentUser.id, body);
  }

  @ApiOperation({
    summary: '팀 내용 수정',
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: TeamReadonlyDto,
  })
  @UseGuards(JwtAuthGuard)
  @Put(':teamId')
  edit(
    @CurrentUser() currentUser,
    @Param('teamId') teamId: string,
    @Body() body: EditTeamRequestDto,
  ) {
    return this.teamsService.edit(currentUser.id, teamId, body);
  }

  @ApiOperation({
    summary: '팀 삭제',
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':teamId')
  delete(@CurrentUser() currentUser, @Param('teamId') teamId: string) {
    return this.teamsService.delete(currentUser.id, teamId);
  }

  @ApiOperation({
    summary: '전체 팀 목록 가져오기',
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: [TeamReadonlyDto],
  })
  @Get()
  getAllTeam() {
    return this.teamsService.getAllTeam();
  }
}
