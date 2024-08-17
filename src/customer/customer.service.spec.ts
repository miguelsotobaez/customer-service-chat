import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerServiceRepresentativeDto } from './dto/customer-service-representative.dto';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should return the first available representative', () => {
    const availableRep: CustomerServiceRepresentativeDto = service.getAvailableRepresentative();
    expect(availableRep).toBeDefined();
    expect(availableRep.isAvailable).toBe(true);
    expect(availableRep.name).toBe('Alice'); // Asumiendo que 'Alice' es el primer representante disponible en la lista
  });

  it('should return null if no representative is available', () => {
    // Manipula el array interno de representatives para que todos estén no disponibles
    service['representatives'].forEach(rep => rep.isAvailable = false);
    
    const availableRep = service.getAvailableRepresentative();
    expect(availableRep).toBeNull();
  });
});