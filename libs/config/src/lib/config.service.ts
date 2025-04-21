import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  public get firestoreProjectId(): string {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');

    if (!projectId) {
      throw new Error('FIREBASE_PROJECT_ID is not defined');
    }

    return projectId;
  }

  public constructor(
    private readonly configService: ConfigService,
  ) {}
}
