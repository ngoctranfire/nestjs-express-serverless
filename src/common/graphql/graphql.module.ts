import { Global, Module } from '@nestjs/common';
import { DateScalar } from './graphql.scalars';

@Global()
@Module({
  providers: [DateScalar],
})
export class GraphQLCustomModule {}
