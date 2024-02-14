import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Author } from './schema/author.schema';
import { AppService } from './app.service';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthorInput {
  @Field()
  name: string;

  @Field()
  age: number;
}

@Resolver((of) => Author)
export class AppResolver {
  constructor(private readonly authorService: AppService) {}

  @Query(() => [Author])
  async authors(): Promise<Author[]> {
    return this.authorService.getAllAuthors();
  }

  @Query(() => Author)
  async author(@Args('id') id: string): Promise<Author> {
    return this.authorService.getAuthorById(id);
  }

  @Mutation(() => Author)
  async createAuthor(@Args('input') authorInput: AuthorInput): Promise<Author> {
    return this.authorService.createAuthor(authorInput);
  }
}
