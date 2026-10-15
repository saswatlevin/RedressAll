import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { OutletsService } from './outlets.service';

describe('OutletsService - Database Tests', () => {
  let service: OutletsService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [OutletsService],
    }).compile();

    service = module.get<OutletsService>(OutletsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('CreateOutlet', () => {
    it('1. should reject an outlet with a duplicate outlet_name', async () => {
      const data = {
        outlet_name: 'Tim Hortons Test Outlet 2',
        outlet_address_room_no: '6',
        outlet_address_building: 'Test Building 3',
        outlet_address_street: 'Test Street 3',
        outlet_address_city: 'Test City Three',
        outlet_address_admin_division: 'Test Division Three',
        outlet_address_country: 'Saudi Arabia',
        outlet_address_post_code: '123458',
        chain_id: 1,
      };

      await expect(
        service.createOutlet(data),
      ).rejects.toThrow();
    });
  });

  describe('Update Chain Id', () => {
        it('2. should update Independent Test Outlet chain_id to 2', async () => {
        const outlet = await prisma.outlet.findFirstOrThrow({
        where: {
          outlet_name: 'Independent Test Outlet',
        },
      });

      await prisma.outlet.update({
        where: {
          outlet_id: outlet.outlet_id,
        },
        data: {
          chain_id: 2,
        },
      });

      const updatedOutlet = await prisma.outlet.findUnique({
        where: {
          outlet_id: outlet.outlet_id,
        },
      });

      expect(updatedOutlet?.chain_id).toBe(2);
    });

    it('3. should update Independent Test Outlet chain_id to NULL', async () => {
      const outlet = await prisma.outlet.findFirstOrThrow({
        where: {
          outlet_name: 'Independent Test Outlet',
        },
      });

      await prisma.outlet.update({
        where: {
          outlet_id: outlet.outlet_id,
        },
        data: {
          chain_id: null,
        },
      });

      const updatedOutlet = await prisma.outlet.findUnique({
        where: {
          outlet_id: outlet.outlet_id,
        },
      });

      expect(updatedOutlet?.chain_id).toBeNull();
    });
    
  });

    describe('UpdateOutletName', () => {
      it('4. should update Tim Hortons Test Outlet 2 outlet_name', async () => {
        const outlet = await prisma.outlet.findFirstOrThrow({
          where: {
            outlet_name: 'Tim Hortons Test Outlet 2',
          },
        });

        await service.updateOutletName(outlet.outlet_id, {
          outlet_name: 'Tim Hortons Test Outlet Updated',
        });

        const updatedOutlet = await prisma.outlet.findUnique({
          where: {
            outlet_id: outlet.outlet_id,
          },
        });

        expect(updatedOutlet?.outlet_name).toBe(
          'Tim Hortons Test Outlet Updated',
        );

        await service.updateOutletName(outlet.outlet_id, {
          outlet_name: 'Tim Hortons Test Outlet 2',
        });
      });
    });

    describe('UpdateOutletAddress', () => {
      it('5. should update outlet_address_room_no to NULL', async () => {
        const outlet = await prisma.outlet.findFirstOrThrow({
          where: {
            outlet_name: 'Tim Hortons Test Outlet 2',
          },
        });

        await service.updateOutletAddress(outlet.outlet_id, {
          outlet_address_room_no: null as any,
        });

        const updatedOutlet = await prisma.outlet.findUnique({
          where: {
            outlet_id: outlet.outlet_id,
          },
        });

        expect(updatedOutlet?.outlet_address_room_no).toBeNull();
      });

      it('6. should update outlet_address_room_no from NULL to 6', async () => {
        const outlet = await prisma.outlet.findFirstOrThrow({
          where: {
            outlet_name: 'Tim Hortons Test Outlet 2',
          },
        });

        await service.updateOutletAddress(outlet.outlet_id, {
          outlet_address_room_no: '6',
        });

        const updatedOutlet = await prisma.outlet.findUnique({
          where: {
            outlet_id: outlet.outlet_id,
          },
        });

        expect(updatedOutlet?.outlet_address_room_no).toBe('6');
      });
  });

  describe('UpdateChainId - Tim Hortons Test Outlet 2', () => {
        it('7. should update Tim Hortons Test Outlet 2 chain_id to 2', async () => {
      const outlet = await prisma.outlet.findFirstOrThrow({
        where: {
          outlet_name: 'Tim Hortons Test Outlet 2',
        },
      });

      await prisma.outlet.update({
        where: {
          outlet_id: outlet.outlet_id,
        },
        data: {
          chain_id: 2,
        },
      });

      const updatedOutlet = await prisma.outlet.findUnique({
        where: {
          outlet_id: outlet.outlet_id,
        },
      });

      expect(updatedOutlet?.chain_id).toBe(2);
    });
  });

  describe('NOT NULL constraint', () => {
    it('8. should reject setting outlet_name to NULL', async () => {
      const outlet = await prisma.outlet.findFirstOrThrow({
        where: {
          outlet_name: 'Tim Hortons Test Outlet 2',
        },
      });

      await expect(
        prisma.outlet.update({
          where: {
            outlet_id: outlet.outlet_id,
          },
          data: {
            outlet_name: null as any,
          },
        }),
      ).rejects.toThrow();
    });
  });

  describe('RemoveOutlet', () => {
    it('9. should delete Tim Hortons Test Outlet 2', async () => {
      const outlet = await prisma.outlet.findFirstOrThrow({
        where: {
          outlet_name: 'Tim Hortons Test Outlet 2',
        },
      });

      await service.removeOutlet(outlet.outlet_id);

      const deletedOutlet = await prisma.outlet.findUnique({
        where: {
          outlet_id: outlet.outlet_id,
        },
      });

      expect(deletedOutlet).toBeNull();
    });
  });

  describe('Re-create Outlet', () => {
    it('10. should recreate Tim Hortons Test Outlet 2', async () => {
      const data = {
        outlet_name: 'Tim Hortons Test Outlet 2',
        outlet_address_room_no: '5',
        outlet_address_building: 'Test Building 2',
        outlet_address_street: 'Test Street 2',
        outlet_address_city: 'Test City Two',
        outlet_address_admin_division: 'Test Division Two',
        outlet_address_country: 'Saudi Arabia',
        outlet_address_post_code: '123457',
        chain_id: 1,
      };

      const outlet = await service.createOutlet(data);

      expect(outlet).toBeDefined();
      expect(outlet.outlet_name).toBe('Tim Hortons Test Outlet 2');
      expect(outlet.chain_id).toBe(1);
    });
  });
});

/**
 * {
        outlet_name: 'Tim Hortons Test Outlet 2',
        outlet_address_room_no: '5',
        outlet_address_building: 'Test Building 2',
        outlet_address_street: 'Test Street 2',
        outlet_address_city: 'Test City Two',
        outlet_address_admin_division: 'Test Division Two',
        outlet_address_country: 'Saudi Arabia',
        outlet_address_post_code: '123457',
        chain_id: 1,
      }
 */