import { Team } from '../teams.schema';
import { PickType } from '@nestjs/swagger';

export class EditTeamRequestDto extends PickType(Team, [
  'name',
  'project_github',
  'project_github',
  'term',
]) {}
