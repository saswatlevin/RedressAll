import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UpdateChainNameDto } from './dto/update-chain-name.dto';
import { ChainsService } from './chains.service';
import { CreateChainDto } from './dto/create-chain.dto';
import { UpdateChainAddressDto } from './dto/update-chain-address.dto';
import { SearchChainsByNameDto } from './dto/search-chain-name.dto';

@Controller('chains')
export class ChainsController {
  constructor(private readonly chainsService: ChainsService) {}

  @Post('create_chain')
  createChain(@Body() createChainDto: CreateChainDto) {
    return this.chainsService.createChain(createChainDto);
  }

  @Get('find_all_chains')
  findAllChains() {
    console.log("In findAllChains");
    return this.chainsService.findAllChains();
  }

  @Get('find_one_chain/:chain_id')
  findOneChain(@Param('chain_id', ParseIntPipe) chain_id: number) {
    console.log("In findOneChain");
    return this.chainsService.findOneChain(chain_id);
  }

  @Get('search_chains_by_name/')
  searchChainsByName(@Body() searchChainsByNameDto: SearchChainsByNameDto) {
    console.log("In searchChainsByName");
    return this.chainsService.searchChainsByName(searchChainsByNameDto);
  }

@Patch('update_chain_name/:chain_id')
updateChainName(
  @Param('chain_id', ParseIntPipe) chain_id: number,
  @Body() updateChainNameDto: UpdateChainNameDto,
) {
  console.log("In updateChainName");
  return this.chainsService.updateChainName(
    chain_id,
    updateChainNameDto,
  );
}

@Patch('update_chain_address/:chain_id')
updateChainAddress(
  @Param('chain_id', ParseIntPipe) chain_id: number,
  @Body() updateChainAddressDto: UpdateChainAddressDto,
) {
  console.log("In updateChainAddress");
  return this.chainsService.updateChainAddress(
    chain_id,
    updateChainAddressDto,
  );
}

@Delete('remove_chain/:chain_id')
  removeChain(@Param('chain_id', ParseIntPipe) chain_id: number) {
    console.log("In removeChain");
    return this.chainsService.removeChain(chain_id);
  }
}
