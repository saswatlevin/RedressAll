import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChainDto } from './dto/create-chain.dto';
import { UpdateChainAddressDto } from './dto/update-chain-address.dto';
import { UpdateChainNameDto } from './dto/update-chain-name.dto';
import { SearchChainsByNameDto } from './dto/search-chain-name.dto';

@Injectable()
export class ChainsService {

  constructor(private readonly prisma: PrismaService) {}
  
  async createChain(createChainDto: CreateChainDto) {
    
    return this.prisma.chain.create({
      data: createChainDto,
    });
  }

  async updateChainName(
    chainId: number,
    updateChainNameDto: UpdateChainNameDto,
  ) {
  return this.prisma.chain.update({
    where: {
      chain_id: chainId,
    },
    data: {
      chain_name: updateChainNameDto.chain_name,
    },
  });
  }
  
  async findAllChains() {
    return this.prisma.chain.findMany();
  }

  async findOneChain(chainId: number) {
    return this.prisma.chain.findUnique({
    where: {
      chain_id: chainId,
    },
  });
  }

  async searchChainsByName(searchChainsByNameDto: SearchChainsByNameDto) {
    return this.prisma.$queryRaw`
    SELECT chain_name
    FROM chains
    WHERE chain_name ILIKE ${'%' + searchChainsByNameDto.chain_name + '%'};
  `;
  }

  async updateChainAddress(chainId: number, 
    updateChainAddressDto: UpdateChainAddressDto) {
    return this.prisma.chain.update({
    where: {
      chain_id: chainId,
    },
    data: updateChainAddressDto
  })
  }

  async removeChain(chainId: number) {
    return this.prisma.chain.delete({
    where: {
      chain_id: chainId,
    },
  });
  }
}
