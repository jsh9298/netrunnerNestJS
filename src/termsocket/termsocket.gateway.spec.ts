import { Test, TestingModule } from '@nestjs/testing';
import { TermsocketGateway } from './termsocket.gateway';

describe('TermsocketGateway', () => {
  let gateway: TermsocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermsocketGateway],
    }).compile();

    gateway = module.get<TermsocketGateway>(TermsocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
