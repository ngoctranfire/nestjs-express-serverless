import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorResponse {
  @Field((type) => String, { nullable: true })
  message?: string;

  @Field((type) => String, { nullable: true })
  name?: string;
}

@ObjectType()
export class ErrorWrapper {
  @Field((type) => ErrorResponse, { nullable: true })
  error?: ErrorResponse;
}
