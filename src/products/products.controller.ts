import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpCode } from '@nestjs/common';
import {
  UnprocessableEntityExceptionFilter,
  NotFoundExceptionFilter,
} from '../http-exceptions/http-exceptions.filter';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @UseFilters(new UnprocessableEntityExceptionFilter())
  async create(
    @Body(new ValidationPipe())
    createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto);
  }

  @Get(':id')
  @UseFilters(new NotFoundExceptionFilter())
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

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
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
