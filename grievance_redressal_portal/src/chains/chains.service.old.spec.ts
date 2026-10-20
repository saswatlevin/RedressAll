import { Test, TestingModule } from '@nestjs/testing';
import { ChainsService } from './chains.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

describe('Database tests', () => {
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ChainsService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('1. should change chain_headquarters_address_room_no of Test Chain to NULL', async () => {
    await prisma.chain.update({
      where: {
        chain_id: 4,
      },
      data: {
        chain_headquarters_address_room_no: null,
      },
    });

    const chain = await prisma.chain.findUnique({
      where: {
        chain_id: 4,
      },
    });

    expect(chain).toBeDefined();
    expect(chain?.chain_name).toBe('Test Chain');
    expect(chain?.chain_headquarters_address_room_no).toBeNull();
  });

  it('2. should change chain_headquarters_address_room_no of Test Chain from NULL to 16', async () => {
  await prisma.chain.update({
    where: {
      chain_id: 4,
    },
    data: {
      chain_headquarters_address_room_no: '16',
    },
  });

  const chain = await prisma.chain.findUnique({
    where: {
      chain_id: 4,
    },
  });

  expect(chain).toBeDefined();
  expect(chain?.chain_name).toBe('Test Chain');
  expect(chain?.chain_headquarters_address_room_no).toBe('16');
});

it('3. should change chain_headquarters_address_building of Test Chain to NULL', async () => {
  await prisma.chain.update({
    where: {
      chain_id: 4,
    },
    data: {
      chain_headquarters_address_building: null,
    },
  });

  const chain = await prisma.chain.findUnique({
    where: {
      chain_id: 4,
    },
  });

  expect(chain).toBeDefined();
  expect(chain?.chain_name).toBe('Test Chain');
  expect(chain?.chain_headquarters_address_building).toBeNull();
});

it('4. should change chain_headquarters_address_building of Test Chain from NULL to TEST BUILDING', async () => {
  await prisma.chain.update({
    where: {
      chain_id: 4,
    },
    data: {
      chain_headquarters_address_building: 'TEST BUILDING',
    },
  });

  const chain = await prisma.chain.findUnique({
    where: {
      chain_id: 4,
    },
  });

  expect(chain).toBeDefined();
  expect(chain?.chain_name).toBe('Test Chain');
  expect(chain?.chain_headquarters_address_building).toBe('TEST BUILDING');
});

it('5. should fail to delete the chain with chain_id 3 because it has related outlets', async () => {
  await expect(
  prisma.chain.delete({
      where: {
        chain_id: 3,
      },
    }),
  ).rejects.toThrow();

  const chain = await prisma.chain.findUnique({
    where: {
      chain_id: 3,
    },
  });

  expect(chain).toBeDefined();
});

it('6. should fail to create another chain named Test Chain because chain_name is unique', async () => {
  await expect(
  prisma.chain.create({
    data: {
      chain_name: 'Test Chain',
      chain_date_created_at: new Date(),
      chain_headquarters_address_room_no: '14',
      chain_headquarters_address_building: 'Test Building 2',
      chain_headquarters_address_street: 'Test Street 2',
      chain_headquarters_address_city: 'Test City Two',
      chain_headquarters_address_admin_division: 'Test Division Twoo',
      chain_headquarters_address_country: 'India',
      chain_headquarters_address_post_code: '560001',
    },
  }),
  ).rejects.toThrow();
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