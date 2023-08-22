import { Document } from 'mongoose';

export interface IProduct extends Document {
  readonly id: number;
  readonly title: string;
  readonly image: string;
  readonly likes: number;
}
