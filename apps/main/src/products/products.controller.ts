import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { EventPattern } from '@nestjs/microservices';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '@app/shared-dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    return await this.productsService.remove(id);
  }

  @Patch(':id/like')
  async like(@Param('id') id: string): Promise<Product> {
    return await this.productsService.like(+id);
  }

  //++++++++++++ Received events from admin ++++++++++++
  @EventPattern('product_created')
  async handleCreatedProduct(product: Product): Promise<Product> {
    return await this.productsService.createFromEvent(product);
  }

  @EventPattern('product_updated')
  async handleUpdatedProduct(product: Product): Promise<Product> {
    return await this.productsService.updateFromEvent(product);
  }

  @EventPattern('product_deleted')
  async handleDeletedProduct(id: number): Promise<Product> {
    return await this.productsService.removeFromEvent(id);
  }
}
