import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Logger } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductController {
  logger = new Logger(':: Product Controller Logger ::');

  constructor(private readonly productService: ProductService) {}
  @MessagePattern('createProduct')
  async create(@Payload() data: CreateProductDto) {
    this.logger.debug(`Create Product request ${JSON.stringify(data)}`);
    return await this.productService.create(data);
  }

  @MessagePattern('findAllProduct')
  async findAll() {
    return await this.productService.findAll();
  }

  @MessagePattern('findOneProduct')
  async findOne(@Payload() id: string) {
    return await this.productService.findOne(id);
  }

  @MessagePattern('updateProduct')
  async update(@Payload() updateProductDto: UpdateProductDto) {
    return await this.productService.update(
      updateProductDto.id,
      updateProductDto,
    );
  }

  @MessagePattern('removeProduct')
  async remove(@Payload() id: string) {
    return await this.productService.remove(id);
  }
}
