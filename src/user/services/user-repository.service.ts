import { User } from '../model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { BaseDatabaseService } from 'src/common/shared/infraestructure/database/abstract-database.service';

@Injectable()
export class UserRepositoryService extends BaseDatabaseService<User> {
  constructor(
    @InjectModel(User.name)
    readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  buildQuery(query: Partial<User>): FilterQuery<User> {
    const filter: FilterQuery<User> = {};
    if (query.username) {
      filter.username = query.username;
    }
    return filter;
  }
}
