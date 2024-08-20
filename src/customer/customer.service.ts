import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerServiceRepresentativeDto } from './dto/customer-service-representative.dto';

@Injectable()
export class CustomerService {
  private representatives: CustomerServiceRepresentativeDto[] = [
    { id: 1, name: 'Alice', isAvailable: this.setIsAvailable() },
    { id: 2, name: 'Bob', isAvailable: this.setIsAvailable() },
    { id: 3, name: 'Charlie', isAvailable: this.setIsAvailable() },
    { id: 4, name: 'Alan', isAvailable: this.setIsAvailable() },
    { id: 5, name: 'Sophia', isAvailable: this.setIsAvailable() },
  ];

  setIsAvailable() {
    return Boolean(Math.random());
  }

  getAvailableRepresentative(): CustomerServiceRepresentativeDto | null {
    const availableRepresentatives = this.representatives.filter(
      (rep) => rep.isAvailable,
    );

    if (availableRepresentatives.length === 0) {
      throw new NotFoundException(
        'No representatives are available at the moment.',
      );
    }

    const randomIndex = Math.floor(
      Math.random() * availableRepresentatives.length,
    );
    return availableRepresentatives[randomIndex];
  }
}
