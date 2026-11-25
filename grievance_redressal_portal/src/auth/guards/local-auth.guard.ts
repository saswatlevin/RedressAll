import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Applied using @UseGuards(LocalAuthGuard)
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}