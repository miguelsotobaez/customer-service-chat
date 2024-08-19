import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerServiceRepresentativeDto } from './dto/customer-service-representative.dto';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiResponse({
    status: 200,
    description: 'Available customer service representative',
    type: CustomerServiceRepresentativeDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No representatives available',
    schema: {
      example: { message: 'No representatives are available at the moment.' },
    },
  })
  @Get('available')
  async getAvailableRepresentative(): Promise<CustomerServiceRepresentativeDto> {
    return await this.customerService.getAvailableRepresentative();
  }
}
