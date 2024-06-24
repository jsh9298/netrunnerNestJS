import { Test, TestingModule } from '@nestjs/testing';
import { GuisocketGateway } from './guisocket.gateway';

describe('GuisocketGateway', () => {
  let gateway: GuisocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuisocketGateway],
    }).compile();

    gateway = module.get<GuisocketGateway>(GuisocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
