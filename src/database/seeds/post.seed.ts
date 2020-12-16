import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PostEntity } from '../../modules/post/post.entity';

export default class PostSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(PostEntity)().createMany(5);
  }
}
