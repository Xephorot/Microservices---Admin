import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[
      TypeOrmModule.forFeature([Product]),
      ClientsModule.register([
        {
          name: 'PRODUCT_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqps://kllqiqln:Hn9KZhfVtF3gIdcPslFqwIZepNaQbOhb@chimpanzee.rmq.cloudamqp.com/kllqiqln'],
            queue: 'main_queue',
            queueOptions: {
              durable: false
            },
          },
        },
      ]),
    ],

  controllers: [ProductController],

  providers: [ProductService]
})
export class ProductModule {

}
