import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Team extends Document {
  @ApiProperty({
    example: '6179f8b10121056d32bb9564',
    description: 'Team owner id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  @IsNotEmpty()
  ownerId: Types.ObjectId;

  @ApiProperty({
    example: 'jonsoku',
    description: 'Team owner name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  ownerName: string;

  @ApiProperty({
    example: 'Tamastudy',
    description: 'Team name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://project.com',
    description: 'Project Link',
  })
  @Prop()
  @IsString()
  @IsOptional()
  project_link: string;

  @ApiProperty({
    example: 'https://github.com/jonsoku2',
    description: 'Github Link',
  })
  @Prop()
  @IsString()
  @IsOptional()
  project_github: string;

  @ApiProperty({
    example: 1,
    description: 'rank',
  })
  @Prop()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsOptional()
  rank: number;

  @ApiProperty({
    example: true,
    description: 'term',
  })
  @IsBoolean()
  @IsOptional()
  @Prop()
  term: boolean;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
