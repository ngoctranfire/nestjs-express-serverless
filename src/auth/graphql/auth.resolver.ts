import {
  Args,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthResponse } from './model/authResponse.model';
import {
  Inject,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { Supabase, SupabaseGuard } from '../../common/supabase';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Session, User } from './model/user.model';

@InputType()
class PhoneCredentialsInput {
  @Field()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}

@InputType()
class PhoneVerificationInput {
  @Field()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  code: string;
}

@Resolver(AuthResponse)
export class AuthResponseResolver {
  constructor(
    @Inject(Supabase) private supabase: Supabase,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @UseGuards(SupabaseGuard)
  @Query(() => Boolean)
  async authCheck(): Promise<boolean> {
    return true;
  }

  @Mutation(() => Boolean)
  async phoneAuth(
    @Args('params', { nullable: false }) params: PhoneCredentialsInput,
  ): Promise<boolean> {
    await this.supabase.signInWithPhone(params.phone);
    return true;
  }

  @Mutation(() => AuthResponse)
  async phoneVerify(
    @Args('params', { nullable: false }) params: PhoneVerificationInput,
  ): Promise<AuthResponse> {
    return await this.supabase.verifyPhone(
      params.phone,
      params.code.toString(),
    );
  }

  @UseGuards(SupabaseGuard)
  @Mutation(() => AuthResponse)
  async refreshSession(
    @Args('refreshToken') refreshToken: string,
  ): Promise<AuthResponse> {
    return await this.supabase.refreshToken(refreshToken);
  }

  @UseGuards(SupabaseGuard)
  @Query(() => User)
  async user(): Promise<User> {
    const { data, error } = await this.supabase.getClient().auth.getUser();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data.user as unknown as User;
  }

  @UseGuards(SupabaseGuard)
  @Query(() => Session)
  async session(): Promise<Session> {
    const { data, error } = await this.supabase.getClient().auth.getSession();
    console.log('here is my session data', data);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data.session as unknown as Session;
  }
}
