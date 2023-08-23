import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductDto);

    const savedProduct = await this.productsRepository.save(newProduct);
    this.productClient.emit('product_created', savedProduct);
    return savedProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneOrFail({
      where: { id: id },
    });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const oldProduct = await this.findOne(id);
    oldProduct.title = updateProductDto.title;
    oldProduct.image = updateProductDto.image;
    const updatedProduct = await this.productsRepository.save(oldProduct);
    this.productClient.emit('product_updated', updatedProduct);
    return updatedProduct;
  }

  async remove(id: number) {
    const oldProduct = await this.findOne(id);

    const deletedProduct = await this.productsRepository.remove(oldProduct);
    this.productClient.emit('product_deleted', deletedProduct);
    return deletedProduct;
  }
}
