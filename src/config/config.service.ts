import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
  SQL_TYPE?: 'mysql' | 'mariadb',
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

      AWS_ACCESSKEYID:Joi.string().required(),
      AWS_SECRETACCESSKEY:Joi.string().required(),
      AWS_REGION:Joi.string().required(),

      SQL_TYPE: Joi.string().valid(['mysql', 'mariadb']).default('mysql'),
      SQL_HOST:Joi.string().required(),
      SQL_PORT:Joi.number().required(),
      SQL_DATABASE:Joi.string().required(),
      SQL_USERNAME:Joi.string().required(),
      SQL_PASSWORD:Joi.string().required(),
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

  get SQL_TYPE(): 'mysql' | 'mariadb' {
    return this.envConfig.SQL_TYPE
  }

  get SQL_PORT(): number {
    return Number(this.envConfig.SQL_PORT)
  }
}