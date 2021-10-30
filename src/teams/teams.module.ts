import { forwardRef, Module } from '@nestjs/common';
import { TeamsController } from './controller/teams.controller';
import { TeamsService } from './service/teams.service';
import { TeamsRepository } from './teams.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/users.schema';
import { Team, TeamSchema } from './teams.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
  exports: [TeamsService, TeamsRepository],
})
export class TeamsModule {}
