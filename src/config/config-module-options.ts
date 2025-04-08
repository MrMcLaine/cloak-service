import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';
import { EnvName } from '../common/enums';

export const configModuleOptions: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: '.env',
    validationSchema: Joi.object({
        [EnvName.PORT]: Joi.number().default(3000),
        [EnvName.NODE_ENV]: Joi.string()
            .valid('development', 'production', 'test')
            .default('development'),
        [EnvName.REDIS_HOST]: Joi.string().required(),
        [EnvName.REDIS_PORT]: Joi.number().required(),
        [EnvName.REDIS_PASSWORD]: Joi.string().allow(''),

        [EnvName.VPN_API_KEY]: Joi.string().required(),
    }),
};
