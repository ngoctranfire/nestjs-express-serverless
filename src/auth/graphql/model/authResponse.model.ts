import { Field, ObjectType } from '@nestjs/graphql';
import { Session, User } from './user.model';
import { ErrorWrapper } from './errorResponse.model';

@ObjectType()
export class AuthResponse extends ErrorWrapper {
  @Field((type) => User, { nullable: true })
  user?: User;

  @Field((type) => Session, { nullable: true })
  session?: Session;
}
