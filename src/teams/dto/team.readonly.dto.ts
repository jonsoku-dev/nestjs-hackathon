import { ApiProperty } from '@nestjs/swagger';
import { Team } from '../teams.schema';

export class TeamReadonlyDto extends Team {
  @ApiProperty({
    example: '6179f8b10121056d32bb9564',
    description: 'id',
  })
  id: string;
}
