import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  }

  parseValue(inputValue: string): Date {
    return new Date(inputValue);
  }

  serialize(outputValue: Date): string {
    const myDate: Date = new Date(outputValue);
    return myDate.toISOString();
  }
}
