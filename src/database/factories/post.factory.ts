import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { PostEntity } from '../../modules/post/post.entity';
import { UserEntity } from '../../modules/user/user.entity';

//The purpose of a factory is to create new fake entites with generate data.
//Factories can also be used to generate test data for some unit, integration or e2e tests.

define(PostEntity, (faker: typeof Faker) => {
  const post = new PostEntity();
  post.title = faker.random.word();
  post.description = faker.random.words();
  post.text = faker.random.words(250);
  post.user = factory(UserEntity)() as any;

  return post;
});
