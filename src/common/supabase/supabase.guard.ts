import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import express from 'express';

@Injectable()
export class SupabaseGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): express.Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
