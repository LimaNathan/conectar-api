import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-aut.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

import { UserPaginationQueryDTO } from './dto/user_pagination_query.dto';
import { UserUpdateDTO } from './dto/user_update.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('2. User')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Busca os usuários do sistema de forma paginada.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('/paginated')
  async findAllPage(@Query() query: UserPaginationQueryDTO) {
    const { page, size, order, name, email, role } = query;
    const filters = {
      name,
      email,
      role,
    };
    return this.userService.findAllPaginated(page, size, order, filters);
  }
  @ApiOperation({ summary: 'Busca os usuários do sistema de forma paginada.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('/paginated/inactive')
  async findAllPageWithoutLoginUntilThirtyDays(
    @Query() query: UserPaginationQueryDTO,
  ) {
    const { page, size, order, name, email, role } = query;

    const filters = {
      name,
      email,
      role,
    };
    return this.userService.findAllUsersWithoutLoginUntilThirtyDays(
      page,
      size,
      order,
      filters,
    );
  }

  @ApiOperation({ summary: 'Atualiza os dados de um usuário' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso!' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: UserUpdateDTO,
    @Request() req: any,
  ) {
    const currentUser = req.user;
    return this.userService.updateUser(
      body,
      currentUser.userId,
      Number(id),
      currentUser.role,
    );
  }

  @ApiOperation({ summary: 'Remove um usuário da base de dados..' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete()
  async deleteUser(@Query('id') id: number) {
    return this.userService.deleteUser(Number(id));
  }
}
