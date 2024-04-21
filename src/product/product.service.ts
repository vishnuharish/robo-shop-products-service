import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Logger } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  logger = new Logger(':: PRODUCT SERVICE LOGGER ::');
  constructor(
    @InjectRepository(Product) private readonly repo: ProductRepository,
  ) {}
  async create(createProductDto: CreateProductDto) {
    this.logger.debug(
      `create product service ${JSON.stringify(createProductDto)}`,
    );
    return await this.repo.save(createProductDto);
  }

  async findAll() {
    this.logger.debug(`Find all products`);
    return await this.repo.find();
  }

  async findOne(id: string) {
    this.logger.debug(`find one product ${JSON.stringify(id)}`);
    const result = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    this.logger.debug(`${JSON.stringify(result)}`);
    return JSON.stringify(result);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    this.logger.debug(`This action updates a #${id} product`);
    const payload = { ...updateProductDto };
    await this.repo.update(id, { ...payload });

    const result = await this.findOne(id);
    return result;
  }

  async remove(id: string) {
    this.logger.debug(`This action removes a #${id} product`);
    const product = await this.findOne(id);
    await this.repo.delete(id);
    return product;
  }
}
