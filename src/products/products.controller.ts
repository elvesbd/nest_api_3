import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpCode } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundExceptionFilter } from 'src/common/filters/not-found.exception.filter';
import { UnprocessableEntityExceptionFilter } from 'src/common/filters/unprocessable-entity.exception.filter';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseFilters(UnprocessableEntityExceptionFilter)
  @Post()
  async create(
    @Body(new ValidationPipe())
    createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto);
  }

  @UseFilters(NotFoundExceptionFilter)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseFilters(NotFoundExceptionFilter)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe())
    updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @UseFilters(NotFoundExceptionFilter)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
