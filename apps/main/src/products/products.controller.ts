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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';
import { IProduct } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<IProduct> {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<IProduct[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IProduct> {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<IProduct> {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IProduct> {
    return await this.productsService.remove(id);
  }

  @EventPattern('product_created')
  async handleCreatedProduct(product: IProduct): Promise<IProduct> {
    return await this.productsService.createFromEvent(product);
  }

  @EventPattern('product_updated')
  async handleUpdatedProduct(product: IProduct): Promise<IProduct> {
    return await this.productsService.updateFromEvent(product);
  }

  @EventPattern('product_deleted')
  async handleDeletedProduct(id: number): Promise<IProduct> {
    return await this.productsService.removeFromEvent(id);
  }
}
