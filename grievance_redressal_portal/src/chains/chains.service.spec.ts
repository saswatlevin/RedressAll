import { Test, TestingModule } from '@nestjs/testing';
import { ChainsService } from './chains.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

import { CreateChainDto } from './dto/create-chain.dto';
import { UpdateChainNameDto } from './dto/update-chain-name.dto';
import { UpdateChainAddressDto } from './dto/update-chain-address.dto';

describe('Database tests - ChainsService', () => {
  let prisma: PrismaService;
  let chainsService: ChainsService;
  let moduleRef: TestingModule;

  const CHAIN_ID = 4;
  let chainCreatedByTest = false;

  const chainData = {
    chain_id: CHAIN_ID,
    chain_date_created_at: new Date(
      '2026-08-26T11:07:33.216241+05:30',
    ),
    chain_name: 'Test Chain',
    chain_headquarters_address_room_no: '16',
    chain_headquarters_address_building: 'TEST BUILDING',
    chain_headquarters_address_street: 'Test Street',
    chain_headquarters_address_city: 'Test City',
    chain_headquarters_address_admin_division: 'Test Division',
    chain_headquarters_address_country: 'India',
    chain_headquarters_address_post_code: '560001',
  };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ChainsService],
    }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    chainsService = moduleRef.get<ChainsService>(ChainsService);

    // Safety check: do not modify an existing chain.
    const existingChain = await prisma.chain.findUnique({
      where: { chain_id: CHAIN_ID },
    });

    if (existingChain) {
      throw new Error(
        `Test aborted: chain_id ${CHAIN_ID} already exists. ` +
          'Use a dedicated test database or free this ID first.',
      );
    }
  });

  afterAll(async () => {
    await prisma?.$disconnect();
    await moduleRef?.close();
  });

  // 1. CREATE CHAIN
  it('1. should create a chain', async () => {
    const createdChain = await chainsService.createChain(
      chainData as CreateChainDto,
    );

    // Set this immediately after a successful database insertion.
    chainCreatedByTest = true;

    expect(createdChain).toMatchObject(chainData);
  });

  // 2. UPDATE CHAIN NAME
  it('2. should update the chain name', async () => {
    const updatedChain = await chainsService.updateChainName(
      CHAIN_ID,
      {
        chain_name: 'UPDATED TEST CHAIN NAME',
      } as UpdateChainNameDto,
    );

    expect(updatedChain).toMatchObject({
      chain_id: CHAIN_ID,
      chain_name: 'UPDATED TEST CHAIN NAME',
    });
  });

  // 3. UPDATE ROOM NUMBER
  it('3. should update the headquarters room number', async () => {
    const updatedChain = await chainsService.updateChainAddress(
      CHAIN_ID,
      {
        chain_headquarters_address_room_no: '22',
      } as UpdateChainAddressDto,
    );

    expect(updatedChain).toMatchObject({
      chain_id: CHAIN_ID,
      chain_headquarters_address_room_no: '22',
    });
  });

  // 4. UPDATE BUILDING
  it('4. should update the headquarters building', async () => {
    const updatedChain = await chainsService.updateChainAddress(
      CHAIN_ID,
      {
        chain_headquarters_address_building:
          'CHAIN HQ ADDRESS BUILDING',
      } as UpdateChainAddressDto,
    );

    expect(updatedChain).toMatchObject({
      chain_id: CHAIN_ID,
      chain_headquarters_address_building:
        'CHAIN HQ ADDRESS BUILDING',
    });
  });

  // 5. UPDATE STREET
  it('5. should update the headquarters street', async () => {
    const updatedChain = await chainsService.updateChainAddress(
      CHAIN_ID,
      {
        chain_headquarters_address_street:
          'CHAIN HQ ADDRESS STREET',
      } as UpdateChainAddressDto,
    );

    expect(updatedChain).toMatchObject({
      chain_id: CHAIN_ID,
      chain_headquarters_address_street:
        'CHAIN HQ ADDRESS STREET',
    });
  });

  // 6. UPDATE CITY
  it('6. should update the headquarters city', async () => {
    const updatedChain = await chainsService.updateChainAddress(
      CHAIN_ID,
      {
        chain_headquarters_address_city:
          'CHAIN HQ ADDRESS CITY',
      } as UpdateChainAddressDto,
    );

    expect(updatedChain).toMatchObject({
      chain_id: CHAIN_ID,
      chain_headquarters_address_city:
        'CHAIN HQ ADDRESS CITY',
    });
  });

  // 7. UPDATE ADMINISTRATIVE DIVISION
  it('7. should update the headquarters administrative division', async () => {
    const updatedChain = await chainsService.updateChainAddress(
      CHAIN_ID,
      {
        chain_headquarters_address_admin_division:
          'CHAIN HQ ADDRESS ADMIN DIVISION',
      } as UpdateChainAddressDto,
    );

    expect(updatedChain).toMatchObject({
      chain_id: CHAIN_ID,
      chain_headquarters_address_admin_division:
        'CHAIN HQ ADDRESS ADMIN DIVISION',
    });
  });

  // 8. UPDATE COUNTRY
  it('8. should update the headquarters country', async () => {
    const updatedChain = await chainsService.updateChainAddress(
      CHAIN_ID,
      {
        chain_headquarters_address_country:
          'United Arab Emirates',
      } as UpdateChainAddressDto,
    );

    expect(updatedChain).toMatchObject({
      chain_id: CHAIN_ID,
      chain_headquarters_address_country:
        'United Arab Emirates',
    });
  });

  // 9. UPDATE POST CODE
  it('9. should update the headquarters post code', async () => {
    const updatedChain = await chainsService.updateChainAddress(
      CHAIN_ID,
      {
        chain_headquarters_address_post_code: '313456',
      } as UpdateChainAddressDto,
    );

    expect(updatedChain).toMatchObject({
      chain_id: CHAIN_ID,
      chain_headquarters_address_post_code: '313456',
    });
  });

  // 10. FIND ONE CHAIN
  it('10. should find the chain with the specified ID', async () => {
    const chain = await chainsService.findOneChain(CHAIN_ID);

    expect(chain).not.toBeNull();

    expect(chain).toMatchObject({
      chain_id: CHAIN_ID,
      chain_name: 'UPDATED TEST CHAIN NAME',
      chain_headquarters_address_room_no: '22',
      chain_headquarters_address_building:
        'CHAIN HQ ADDRESS BUILDING',
      chain_headquarters_address_street:
        'CHAIN HQ ADDRESS STREET',
      chain_headquarters_address_city:
        'CHAIN HQ ADDRESS CITY',
      chain_headquarters_address_admin_division:
        'CHAIN HQ ADDRESS ADMIN DIVISION',
      chain_headquarters_address_country:
        'United Arab Emirates',
      chain_headquarters_address_post_code: '313456',
    });
  });

  // 11. REMOVE CHAIN
  it('11. should remove the chain with the specified ID', async () => {
    // Avoid deleting a record that this test suite did not create.
    if (!chainCreatedByTest) {
      throw new Error(
        'Cannot remove chain: the create-chain test did not create it.',
      );
    }

    const removedChain = await chainsService.removeChain(CHAIN_ID);

    expect(removedChain).toMatchObject({
      chain_id: CHAIN_ID,
    });

    const deletedChain = await chainsService.findOneChain(CHAIN_ID);

    expect(deletedChain).toBeNull();

    chainCreatedByTest = false;
  });
});


/**
 * {
"chain_id": 4,
"chain_date_created_at": "2026-08-26T11:07:33.216241+05:30",
"chain_name": "Test Chain",
"chain_headquarters_address_room_no": "16",
"chain_headquarters_address_building": "TEST BUILDING",
"chain_headquarters_address_street": "Test Street",
"chain_headquarters_address_city": "Test City",
"chain_headquarters_address_admin_division": "Test Division",
"chain_headquarters_address_country": "India",
"chain_headquarters_address_post_code": "560001"
}
 */