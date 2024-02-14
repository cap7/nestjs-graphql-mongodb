import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type AuthorDocument = HydratedDocument<Author>;

@ObjectType()
@Schema()
export class Author {
  @Field((type) => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  age: number;

  @Field()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
