import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  public get firestoreApiKey(): string {
    const apiKey = this.configService.get<string>('FIREBASE_API_KEY');

    if (!apiKey) {
      throw new Error('FIREBASE_API_KEY is not defined');
    }

    return apiKey;
  }

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
