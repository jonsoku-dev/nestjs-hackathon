import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UpdateTeamRequestDto extends PickType(User, ['team'] as const) {}
