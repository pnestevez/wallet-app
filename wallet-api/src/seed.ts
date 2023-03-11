import { NestFactory } from '@nestjs/core';
import { SeederModule } from './modules/seeds/seeder.module';
import { SeederService } from './modules/seeds/seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(SeederService);

  await Promise.all(seeder.seed())
    .then(() => console.log('Seeding complete!'))
    .catch(console.error);

  await app.close();
}
bootstrap();
