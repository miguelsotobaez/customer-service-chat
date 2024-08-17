import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerServiceRepresentativeDto } from './dto/customer-service-representative.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('available')
  getAvailableRepresentative(): CustomerServiceRepresentativeDto | { message: string } {
    const representative = this.customerService.getAvailableRepresentative();
    if (representative) {
      return representative;
    } else {
      return { message: 'No representatives are available at the moment.' };
    }
  }
}