import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    // TODO: maybe change this because i'm exposing the product class
    @InjectModel(Product.name)
    private readonly productModel: Model<IProduct>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    const newProduct = new this.productModel(createProductDto);

    return await newProduct.save();
  }

  async findAll(): Promise<IProduct[]> {
    const products = await this.productModel.find();
    if (!products || products.length == 0) {
      throw new NotFoundException('products data not found!');
    }
    return products;
  }

  async findOne(id: number): Promise<IProduct> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<IProduct> {
    const existingProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true }
    );
    if (!existingProduct) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return existingProduct;
  }

  async remove(id: number): Promise<IProduct> {
    const productToDelete = await this.productModel.findByIdAndDelete(id);
    if (!productToDelete) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return productToDelete;
  }
}
