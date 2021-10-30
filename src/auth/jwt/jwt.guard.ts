import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * strategy 를 실행 시키는 녀석
 */

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
