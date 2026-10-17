import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { OutletsService } from './outlets.service';


describe('Database tests - OutletsService', () => {
  let prisma: PrismaService;
  let outletsService: OutletsService;
  let moduleRef: TestingModule;

  const OUTLET_ID = 4;
  const CHAIN_ID = 3;

  let outletCreatedByTest = false;

  const outletData = {
    outlet_id: OUTLET_ID,
    outlet_date_created_at: new Date(
      '2026-08-13T10:20:52.051096+05:30',
    ),
    outlet_name: 'Road Cafe #2',
    outlet_address_room_no: null,
    outlet_address_building: null,
    outlet_address_street: '4116 Prince Sultan Road',
    outlet_address_city: 'Riyadh',
    outlet_address_admin_division: 'Eastern Province',
    outlet_address_country: 'Saudi Arabia',
    outlet_address_post_code: '34235',
    chain_id: CHAIN_ID,
  };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [OutletsService],
    }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    outletsService = moduleRef.get<OutletsService>(OutletsService);

    // Ensure the referenced chain exists.
    const chain = await prisma.chain.findUnique({
      where: {
        chain_id: CHAIN_ID,
      },
    });

    if (!chain) {
      throw new Error(
        `Test aborted: chain_id ${CHAIN_ID} does not exist.`,
      );
    }

    // Do not overwrite or modify an existing outlet.
    const existingOutlet = await prisma.outlet.findUnique({
      where: {
        outlet_id: OUTLET_ID,
      },
    });

    if (existingOutlet) {
      throw new Error(
        `Test aborted: outlet_id ${OUTLET_ID} already exists. ` +
          'Use a dedicated test database or free this ID first.',
      );
    }
  });

  afterAll(async () => {
    try {
      // Clean up the outlet if a test failed before the deletion test.
      if (outletCreatedByTest) {
        await prisma.outlet.deleteMany({
          where: {
            outlet_id: OUTLET_ID,
          },
        });
      }
    } finally {
      await prisma?.$disconnect();
      await moduleRef?.close();
    }
  });

  // 1. CREATE OUTLET
  it('1. should create an outlet linked to chain_id 3', async () => {
    const createdOutlet = await outletsService.createOutlet(
      outletData as any,
    );

    outletCreatedByTest = true;

    expect(createdOutlet).toMatchObject(outletData);

    expect(createdOutlet.chain_id).toBe(CHAIN_ID);
  });

  // 2. UPDATE OUTLET NAME
  it('2. should update the outlet name', async () => {
    const updatedOutlet = await outletsService.updateOutletName(
      OUTLET_ID,
      {
        outlet_name: 'Road Cafe TEST OUTLET',
      } as any,
    );

    expect(updatedOutlet).toMatchObject({
      outlet_id: OUTLET_ID,
      outlet_name: 'Road Cafe TEST OUTLET',
    });
  });

  // 3. UPDATE ROOM NUMBER
  it('3. should update the outlet room number', async () => {
    const updatedOutlet = await outletsService.updateOutletAddress(
      OUTLET_ID,
      {
        outlet_address_room_no: '1',
      } as any,
    );

    expect(updatedOutlet).toMatchObject({
      outlet_id: OUTLET_ID,
      outlet_address_room_no: '1',
    });
  });

  // 4. UPDATE BUILDING
  it('4. should update the outlet building', async () => {
    const updatedOutlet = await outletsService.updateOutletAddress(
      OUTLET_ID,
      {
        outlet_address_building: 'TEST OUTLET BUILDING',
      } as any,
    );

    expect(updatedOutlet).toMatchObject({
      outlet_id: OUTLET_ID,
      outlet_address_building: 'TEST OUTLET BUILDING',
    });
  });

  // 5. UPDATE STREET
  it('5. should update the outlet street', async () => {
    const updatedOutlet = await outletsService.updateOutletAddress(
      OUTLET_ID,
      {
        outlet_address_street: 'TEST  OUTLET STREET',
      } as any,
    );

    expect(updatedOutlet).toMatchObject({
      outlet_id: OUTLET_ID,
      outlet_address_street: 'TEST  OUTLET STREET',
    });
  });

  // 6. UPDATE CITY
  it('6. should update the outlet city', async () => {
    const updatedOutlet = await outletsService.updateOutletAddress(
      OUTLET_ID,
      {
        outlet_address_city: 'TEST  OUTLET CITY',
      } as any,
    );

    expect(updatedOutlet).toMatchObject({
      outlet_id: OUTLET_ID,
      outlet_address_city: 'TEST  OUTLET CITY',
    });
  });

  // 7. UPDATE ADMINISTRATIVE DIVISION
  it('7. should update the outlet administrative division', async () => {
    const updatedOutlet = await outletsService.updateOutletAddress(
      OUTLET_ID,
      {
        outlet_address_admin_division:
          'TEST  OUTLET ADMIN DIVISION',
      } as any,
    );

    expect(updatedOutlet).toMatchObject({
      outlet_id: OUTLET_ID,
      outlet_address_admin_division:
        'TEST  OUTLET ADMIN DIVISION',
    });
  });

  // 8. UPDATE COUNTRY
  it('8. should update the outlet country', async () => {
    const updatedOutlet = await outletsService.updateOutletAddress(
      OUTLET_ID,
      {
        outlet_address_country: 'India',
      } as any,
    );

    expect(updatedOutlet).toMatchObject({
      outlet_id: OUTLET_ID,
      outlet_address_country: 'India',
    });
  });

  // 9. UPDATE POST CODE
  it('9. should update the outlet post code', async () => {
    const updatedOutlet = await outletsService.updateOutletAddress(
      OUTLET_ID,
      {
        outlet_address_post_code: '123456',
      } as any,
    );

    expect(updatedOutlet).toMatchObject({
      outlet_id: OUTLET_ID,
      outlet_address_post_code: '123456',
    });
  });

  // 10. FIND ONE OUTLET
  it('10. should find the outlet with outlet_id 4', async () => {
    const outlet = await outletsService.findOneOutlet(OUTLET_ID);

    expect(outlet).not.toBeNull();

    expect(outlet).toMatchObject({
      outlet_id: OUTLET_ID,
      outlet_name: 'Road Cafe TEST OUTLET',
      outlet_address_room_no: '1',
      outlet_address_building: 'TEST OUTLET BUILDING',
      outlet_address_street: 'TEST  OUTLET STREET',
      outlet_address_city: 'TEST  OUTLET CITY',
      outlet_address_admin_division:
        'TEST  OUTLET ADMIN DIVISION',
      outlet_address_country: 'India',
      outlet_address_post_code: '123456',
      chain_id: CHAIN_ID,
    });
  });

  // 11. SEARCH OUTLETS BY NAME
  it('11. should search for outlets by name', async () => {
    const results = await outletsService.searchOutletsByName(
      {
        outlet_name: 'Road Cafe TEST OUTLET',
      } as any,
    );

    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          outlet_name: 'Road Cafe TEST OUTLET',
        }),
      ]),
    );
  });

  // 12. FIND ALL OUTLETS
  it('12. should find all outlets', async () => {
    const outlets = await outletsService.findAllOutlets();

    expect(Array.isArray(outlets)).toBe(true);

    expect(outlets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          outlet_id: OUTLET_ID,
          outlet_name: 'Road Cafe TEST OUTLET',
        }),
      ]),
    );
  });

  // 13. REMOVE OUTLET
  it('13. should remove the outlet with outlet_id 4', async () => {
    if (!outletCreatedByTest) {
      throw new Error(
        'Cannot remove outlet: the create-outlet test did not create it.',
      );
    }

    const removedOutlet = await outletsService.removeOutlet(OUTLET_ID);

    outletCreatedByTest = false;

    expect(removedOutlet).toMatchObject({
      outlet_id: OUTLET_ID,
    });

    const deletedOutlet = await outletsService.findOneOutlet(OUTLET_ID);

    expect(deletedOutlet).toBeNull();
  });
});

/**
 *  {
  "outlet_id": 4,
  "outlet_date_created_at": "2026-08-13T10:20:52.051096+05:30",
  "outlet_name": "Road Cafe #2",
  "outlet_address_room_no": null,
  "outlet_address_building": null,
  "outlet_address_street": "4116 Prince Sultan Road",
  "outlet_address_city": "Riyadh",
  "outlet_address_admin_division": "Eastern Province",
  "outlet_address_country": "Saudi Arabia",
  "outlet_address_post_code": "34235",
  "chain_id": 3
}
 */