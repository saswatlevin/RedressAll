import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChainDto } from './dto/create-chain.dto';
import { UpdateChainAddressDto } from './dto/update-chain-address.dto';
import { UpdateChainNameDto } from './dto/update-chain-name.dto';
import { SearchChainsByNameDto } from './dto/search-chain-name.dto';

@Injectable()
export class ChainsService {

  // Initializing Logger to transport logs to WinstonLogger
   private readonly logger = new Logger(ChainsService.name);

  constructor(private readonly prisma: PrismaService) {}
  
  async createChain(createChainDto: CreateChainDto) {
    
    const created_chain = await this.prisma.chain.create({
      data: createChainDto,
    });

    this.logger.log(`Creating a new chain; data: ${JSON.stringify(createChainDto)}`);

    return created_chain;
  }

  async updateChainName(
    chainId: number,
    updateChainNameDto: UpdateChainNameDto,
  ) {
  
    const updated_chain = await this.prisma.chain.update({
      where: {
        chain_id: chainId,
      },
      data: {
        chain_name: updateChainNameDto.chain_name,
      },
    });

    this.logger.log(`Updating the chain_name of chain with chainId: ${chainId} data: ${JSON.stringify(updateChainNameDto)}`);
    return updated_chain;
  }
  
  async findAllChains() {
    const all_chains = await this.prisma.chain.findMany();
    this.logger.log(`Found all chains`);
    return all_chains;
  }

  async findOneChain(chainId: number) {
    const found_chain = await this.prisma.chain.findUnique({
    where: {
      chain_id: chainId,
    },

  });

    this.logger.log(`Found chain of chainId ${chainId}; data: ${found_chain} `);
    return found_chain;
  }

  async searchChainsByName(searchChainsByNameDto: SearchChainsByNameDto) {
    const searched_chains = await this.prisma.$queryRaw`
    SELECT chain_name
    FROM chains
    WHERE chain_name ILIKE ${'%' + searchChainsByNameDto.chain_name + '%'};
  `;
    this.logger.log(`Found chains searched using chain_name: ${SearchChainsByNameDto} data: ${searched_chains}`);
    return searched_chains;
  }

  async updateChainAddress(chainId: number, 
    updateChainAddressDto: UpdateChainAddressDto) {
    const updated_chain = await this.prisma.chain.update({
      where: {
        chain_id: chainId,
      },
      data: updateChainAddressDto
    });

    this.logger.log(`Updating the chain_address of chain with chainId: ${chainId} data: ${JSON.stringify(updateChainAddressDto)}`);
    return updated_chain;
  }

  async removeChain(chainId: number) {
    const removed_chain = await this.prisma.chain.delete({
    where: {
      chain_id: chainId,
    },
  });

  this.logger.log(`Removing the chain with chainId ${chainId}; data: ${removed_chain}`);
  return removed_chain;

  }
}
