import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './schema/author.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Author.name)
    private readonly authorModel: Model<AuthorDocument>,
  ) {}

  async getAllAuthors(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async getAuthorById(id: string): Promise<Author> {
    return this.authorModel.findById(id).exec();
  }

  async createAuthor(authorData: Partial<Author>): Promise<Author> {
    const createdAuthor = new this.authorModel(authorData);
    return createdAuthor.save();
  }
}
