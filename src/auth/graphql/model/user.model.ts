import {
  Field,
  GraphQLISODateTime,
  GraphQLTimestamp,
  ObjectType,
} from '@nestjs/graphql';
import { IsNumber, IsPhoneNumber } from 'class-validator';

@ObjectType()
export class AppMetadata {
  @Field()
  provider: string;

  @Field((type) => [String])
  providers: string[];
}

@ObjectType()
export class IdentityData {
  @Field()
  sub: string;
}

@ObjectType()
export class Identity {
  @Field()
  id: string;

  @Field()
  user_id: string;

  @Field()
  identity_data: IdentityData;

  @Field()
  provider: string;

  @Field((type) => Date)
  last_sign_in_at: Date;

  @Field((type) => Date)
  created_at: Date;

  @Field((type) => Date)
  updated_at: Date;
}

@ObjectType()
export class UserMetadata {
  @Field(() => String)
  noValue: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  aud: string;

  @Field()
  role: string;

  @Field()
  email: string;

  @Field()
  @IsPhoneNumber()
  phone: string;

  @Field((type) => Date)
  phone_confirmed_at: Date;

  @Field((type) => Date)
  confirmation_sent_at: Date;

  @Field((type) => Date)
  last_sign_in_at: Date;

  @Field((type) => AppMetadata)
  app_metadata: AppMetadata;

  @Field((type) => UserMetadata)
  user_metadata: UserMetadata;

  @Field((type) => [Identity])
  identities: Identity[];

  @Field((type) => Date)
  created_at: Date;

  @Field((type) => String)
  updated_at: string;
}

@ObjectType()
export class Session {
  @Field()
  access_token: string;

  @Field()
  token_type: string;

  @Field()
  expires_in: number;

  @Field()
  refresh_token: string;

  @Field((type) => User)
  user: User;

  @Field()
  @IsNumber()
  expires_at: number;
}
