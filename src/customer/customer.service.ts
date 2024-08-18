import { Injectable } from '@nestjs/common';
import { CustomerServiceRepresentativeDto } from './dto/customer-service-representative.dto';

@Injectable()
export class CustomerService {
  private representatives: CustomerServiceRepresentativeDto[] = [
    { id: 1, name: 'Alice', isAvailable: true },
    { id: 2, name: 'Bob', isAvailable: false },
    { id: 3, name: 'Charlie', isAvailable: true },
    { id: 4, name: 'Alan', isAvailable: true },
    { id: 5, name: 'Sophia', isAvailable: true },
  ];

  getAvailableRepresentative(): CustomerServiceRepresentativeDto | null {
    const availableRepresentatives = this.representatives.filter(rep => rep.isAvailable);

    if (availableRepresentatives.length === 0) {
      return null; // No hay representantes disponibles
    }

    const randomIndex = Math.floor(Math.random() * availableRepresentatives.length);
    return availableRepresentatives[randomIndex];
  }
}