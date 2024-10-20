import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      //localhost si es la base de datos esta instalado de manera local local, si se esta usando un contendor, cambios este valor al nombre del contenedor.
      host: 'nest-admin',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_admin',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
