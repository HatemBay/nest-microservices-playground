import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<IProduct>,
    private readonly httpService: HttpService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);

    return await newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    if (!products || products.length == 0) {
      throw new NotFoundException('products data not found!');
    }
    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
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

  async remove(id: string): Promise<Product> {
    const productToDelete = await this.productModel.findByIdAndDelete(id);

    if (!productToDelete) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return productToDelete;
  }

  async like(id: number): Promise<Product> {
    const existingProduct = (await this.productModel.findOne({
      id,
    })) as Product;

    existingProduct.likes += 1;

    this.httpService
      .patch(`http://localhost:3000/products/${id}/like`, {})
      .subscribe();

    return this.updateFromEvent(existingProduct);
  }

  //++++++++++++ Received events from admin ++++++++++++

  async createFromEvent(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);

    const savedProduct = await newProduct.save();
    return savedProduct;
  }

  async updateFromEvent(product: Product): Promise<Product> {
    const existingProduct = await this.productModel.findOneAndUpdate(
      { id: product.id },
      product,
      { new: true }
    );
    if (!existingProduct) {
      throw new NotFoundException(`Product ${product.id} not found`);
    }
    return existingProduct;
  }
  async removeFromEvent(id: number): Promise<Product> {
    const productToDelete = await this.productModel.findOneAndDelete({
      id,
    });
    if (!productToDelete) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return productToDelete;
  }
}
