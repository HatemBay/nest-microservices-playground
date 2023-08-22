import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// * We can use this instead of defining IProduct and add it as type in the injected model
// export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  likes: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
