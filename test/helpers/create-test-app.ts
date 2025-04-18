import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { VpnDetectionService } from '../../src/vpn-api/vpn-detection.service';
import { MockVpnDetectionService } from '../mocks/mock-vpn.service';
import { MockRedisClient } from '../mocks/mock-redis-client';

export const createTestApp = async (): Promise<INestApplication> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    })
        .overrideProvider(VpnDetectionService)
        .useClass(MockVpnDetectionService)
        .overrideProvider('REDIS_CLIENT')
        .useValue(MockRedisClient)
        .compile();

    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    return app;
};
