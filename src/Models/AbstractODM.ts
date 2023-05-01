import { Model, Schema, model, models } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  private schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async findIdAndUpdate(id: string, obj: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, obj);
  }
}

export default AbstractODM;
