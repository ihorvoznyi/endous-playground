import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { ENTITIES } from './entities';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async (config: ConfigService) => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            url: config.get('db.url'),
            synchronize: true,
            entities: ENTITIES,
          });
          await dataSource.initialize();
          console.log('Database connected successfully');

          return dataSource;
        } catch (error) {
          console.error('Error connecting to database');
          throw error;
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
