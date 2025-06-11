import { Model, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { DefaultModel } from '../../domain/default-model';

@Injectable()
export abstract class BaseDatabaseService<T extends DefaultModel> {
  constructor(protected readonly model: Model<T>) {}

  async findAll(filter = {}): Promise<T[]> {
    const query = this.buildQuery(filter);
    const results = await this.model
      .find(query, null, {
        lean: true,
      })
      .exec();

    return results?.map((item: any) => ({
      ...item,
      _id: item._id?.toString?.() ?? item._id,
    })) as any as Promise<T[]>;
  }

  async getTotalItems(filter = {}): Promise<number> {
    const query = this.buildQuery(filter);
    return this.model.countDocuments(query).exec();
  }

  async findOne(filter = {}): Promise<T | null> {
    const query = this.buildQuery(filter);
    const result = (await this.model
      .findOne(query, null, {
        lean: true,
      })
      .exec()) as unknown as T;

    if (!result) return null;
    return {
      ...result,
      _id: result._id?.toString?.() ?? result._id,
    } as T;
  }

  async create(dto: Partial<T>): Promise<T> {
    const doc = new this.model(dto);
    return doc.save();
  }

  async update(id: string, dto: Partial<T>): Promise<T | null> {
    const document = await this.findOne({ _id: id });
    if (!document) {
      return null;
    }
    return this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .lean()
      .exec() as Promise<T | null>;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  protected abstract buildQuery(requestQuery: any): FilterQuery<T>;
}
