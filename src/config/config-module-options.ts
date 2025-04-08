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

        [EnvName.REDIS_URL]: Joi.string().uri().required(),

        [EnvName.VPN_API_KEY]: Joi.string().required(),
    }),
};
