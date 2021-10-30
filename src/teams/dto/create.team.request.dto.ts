import { Team } from '../teams.schema';
import { PickType } from '@nestjs/swagger';

export class CreateTeamRequestDto extends PickType(Team, ['name']) {}
