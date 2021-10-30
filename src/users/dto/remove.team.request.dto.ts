import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class RemoveTeamRequestDto extends PickType(User, ['team'] as const) {}
