import { Injectable } from '@nestjs/common';
import { CustomerServiceRepresentativeDto } from './dto/customer-service-representative.dto';

@Injectable()
export class CustomerService {
  private representatives: CustomerServiceRepresentativeDto[] = [
    { id: 1, name: 'Alice', isAvailable: true },
    { id: 2, name: 'Bob', isAvailable: false },
    { id: 3, name: 'Charlie', isAvailable: true },
  ];

  getAvailableRepresentative(): CustomerServiceRepresentativeDto | null {
    return this.representatives.find(rep => rep.isAvailable) || null;
  }
}