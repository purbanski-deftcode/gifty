import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FirestoreService } from '@gifty/infrastructure';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly firebase: FirestoreService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) return false;

    try {
      req.user = await this.firebase.verifyToken(token);
      return true;
    } catch (err) {
      console.error('Token verification failed:', err);
      return false;
    }
  }
}
