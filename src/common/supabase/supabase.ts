import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { ExtractJwt } from 'passport-jwt';
import { AuthResponse } from '../../auth/graphql/model/authResponse.model';
import { CONTEXT, GraphQLExecutionContext } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private readonly logger = new Logger(Supabase.name);
  private anonClientInstance = createClient(
    this.configService.get('SUPABASE_URL'),
    this.configService.get('SUPABASE_KEY'),
  );

  private clientInstance: SupabaseClient;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService,
  ) {}

  async signInWithPhone(phoneNumber: string): Promise<any> {
    const { data, error } = await this.anonClientInstance.auth.signInWithOtp({
      phone: phoneNumber,
      options: {
        shouldCreateUser: true,
      },
    });
    if (error) {
      this.logger.error(
        'There was an error signing in with phone number',
        error,
      );
      return {
        error: {
          message: error.message,
          name: error.name,
        },
      };
    }
    return data;
  }

  async verifyPhone(phoneNumber: string, code: string): Promise<AuthResponse> {
    const { data, error } = await this.anonClientInstance.auth.verifyOtp({
      phone: phoneNumber,
      token: code,
      type: 'sms',
    });
    if (error) {
      return {
        error: {
          message: error.message,
          name: error.name,
        },
      };
    }
    return data as unknown as AuthResponse;
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const { data, error } = await this.getClient().auth.refreshSession({
      refresh_token: refreshToken,
    });
    console.error(error);
    if (error) {
      return {
        error: {
          message: error.message,
          name: error.name,
        },
      };
    }
    return data as unknown as AuthResponse;
  }

  getClient() {
    this.logger.log('getting supabase client...');
    if (this.clientInstance) {
      this.logger.log(
        'supabase client already exists -- returning for current Scope.REQUEST',
      );
      return this.clientInstance;
    }
    this.logger.log('initialising new supabase client for new Scope.REQUEST');
    // console.log('This is my request', this.request);
    // Used to support both normal Request headers and ones modified by GRAPHQL context

    let expressRequest: any = this.request;
    if (expressRequest.req != null) {
      expressRequest = expressRequest.req;
    }

    this.clientInstance = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
      {
        global: {
          headers: {
            Authorization: `Bearer ${ExtractJwt.fromAuthHeaderAsBearerToken()(
              expressRequest,
            )}`,
          },
        },
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      },
    );
    this.logger.log('Auth has been set!');
    return this.clientInstance;
  }
}
