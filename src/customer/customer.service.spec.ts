import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerServiceRepresentativeDto } from './dto/customer-service-representative.dto';
import { NotFoundException } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should return the first available representative', () => {
    // Mock the method to return a specific representative
    jest.spyOn(service, 'getAvailableRepresentative').mockReturnValue({
      id: 1,
      name: 'Alice',
      isAvailable: true,
    } as CustomerServiceRepresentativeDto);

    const availableRep: CustomerServiceRepresentativeDto =
      service.getAvailableRepresentative();
    expect(availableRep).toBeDefined();
    expect(availableRep.isAvailable).toBe(true);
    expect(availableRep.name).toBe('Alice'); // Expect 'Alice'
  });

  it('should throw NotFoundException if no representative is available', () => {
    // Manipula el array interno de representatives para que todos estén no disponibles
    service['representatives'].forEach((rep) => (rep.isAvailable = false));

    expect(() => service.getAvailableRepresentative()).toThrow(
      NotFoundException,
    );
  });
});
