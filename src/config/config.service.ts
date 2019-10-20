import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
  DB_CONNECTION?: 'mysql' | 'mariadb';
  [key: string]: string
}
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string = '.env') {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'staging'])
        .default('development'),
      
      AUTH_JWT_SECRET: Joi.string().required(),
      AUTH_JWT_EXPIRED_IN: Joi.string().required(),

      DB_CONNECTION: Joi.string().required(),
      DB_HOST:Joi.string().required(),
      DB_PORT:Joi.number().required(),
      DB_DATABASE:Joi.string().required(),
      DB_USERNAME:Joi.string().required(),
      DB_PASSWORD:Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get AUTH_JWT_SECRET(): string {
    return this.envConfig.AUTH_JWT_SECRET
  }

  get AUTH_JWT_EXPIRED_IN(): string | number {
    return this.envConfig.AUTH_JWT_EXPIRED_IN
  }

  get DB_CONNECTION(): 'mysql' | 'mariadb' {
    return this.envConfig.DB_CONNECTION
  }

  get DB_PORT(): number {
    return Number(this.envConfig.SQL_PORT)
  }
}