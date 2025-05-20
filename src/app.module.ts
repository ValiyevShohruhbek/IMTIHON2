import { Module } from '@nestjs/common';
import { CoreModules } from './core/core.module';
import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/user/user.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SubscriptionModule } from './models/subscription/subscription.module';
import { UserSubscriptionsModule } from './models/user_subscription/user_subs.module';
import { AdminPanelModule } from './models/admin_panel/admin.module';
import { MovieModule } from './models/movies/movie.module';
import { FavoriteModule } from './models/favorites/favorite.module';
import { CommentModule } from './models/comments/comment.module';

@Module({
  imports: [
    CoreModules,
    AuthModule,
    UserModule,
    SubscriptionModule,
    UserSubscriptionsModule,
    AdminPanelModule,
    MovieModule,
    FavoriteModule,
    CommentModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: TransformInterceptor }],
})
export class AppModule {}
