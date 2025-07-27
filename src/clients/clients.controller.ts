import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-aut.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ClientsService } from './clients.service';
import { ClientsPaginationQueryDTO } from './dto/clients_pagination_query.dto';
import { ClientCreateDTO } from './dto/create_client.dto';
import { UpdateClientDTO } from './dto/update_client.dto';

@Controller('clients')
@ApiTags('3 .Clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @ApiOperation({
    summary: 'Registrar um novo Client',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  singup(@Body() body: ClientCreateDTO) {
    return this.clientService.create(body);
  }

  @ApiOperation({ summary: 'Busca os clients do sistema de forma paginada.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/paginated')
  async findAllPage(
    @Query() query: ClientsPaginationQueryDTO,
    @Request() req: any,
  ) {
    const {
      page,
      size,
      order,
      presentationName,
      corporateReason,
      tags,
      conectaPlus,
      status,
      cnpj
    } = query;
    const currentUser = req.user;
    const filters = {
      presentationName,
      corporateReason,
      tags,
      status,
      conectaPlus,
      cnpj,
    };
    return this.clientService.findAllPaginated(
      page,
      size,
      order,
      currentUser.id,
      currentUser.role,
      filters,
    );
  }

  @ApiOperation({ summary: 'Atualiza os dados de um usuário' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso!' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Body() body: UpdateClientDTO,
    @Request() req: any,
    @Param('id') clientId: number,
  ) {
    const currentUser = req.user;
    return this.clientService.updateClient(
      body,
      currentUser.id,
      clientId,
      currentUser.role,
    );
  }

  @ApiOperation({ summary: 'Atualiza os dados de um client' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso!' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: UpdateClientDTO,
    @Request() req: any,
  ) {
    const currentUser = req.user;
    return this.clientService.updateClient(
      body,
      id,
      currentUser.id,
      currentUser.role,
    );
  }

  @ApiOperation({
    summary: 'Remove um cliente da base de dados (APENAS ADMINS)',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async delete(@Query('id') id: number) {
    return this.clientService.deleteClient(id);
  }
  @ApiOperation({
    summary: 'Remove um cliente da base de dados (APENAS ADMINS)',
  })
  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiQuery({ name: 'userId', required: true, type: Number })
  @ApiQuery({ name: 'clientId', required: true, type: Number })
  async addUser(
    @Query('userId') userId: number,
    @Query('clientId') clientId: number,
  ) {
    return this.clientService.addUserToClient(userId, clientId);
  }
}
