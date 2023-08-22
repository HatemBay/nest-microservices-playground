import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductDto);

    return await this.productsRepository.save(newProduct);
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
    return this.productsRepository.save(oldProduct);
  }

  async remove(id: number) {
    const oldProduct = await this.findOne(id);

    return this.productsRepository.remove(oldProduct);
  }
}
