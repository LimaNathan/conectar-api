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
import { PaginationQueryDTO } from './dto/paginated_query.dto';
import { UserUpdateDTO } from './dto/user_update.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

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
      currentUser.id,
      id,
      currentUser.role,
    );
  }

  @ApiOperation({ summary: 'Busca os usuários do sistema de forma paginada.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('/paginated')
  async findAllPage(@Query('page') query: PaginationQueryDTO) {
    const { page, size, order, name, email, role } = query;
    return this.userService.findAllPaginated(page, size, order, {
      name,
      email,
      role,
    });
  }
  @ApiOperation({ summary: 'Busca os usuários do sistema de forma paginada.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('/paginated/inactive')
  async findAllPageWithoutLoginUntilThirtyDays(
    @Query('page') query: PaginationQueryDTO,
  ) {
    const { page, size, order, name, email, role } = query;
    return this.userService.findAllUsersWithoutLoginUntilThirtyDays(
      page,
      size,
      order,
      {
        name,
        email,
        role,
      },
    );
  }

  @ApiOperation({ summary: 'Remove um usuário da base de dados..' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async deleteUser(@Query('id') id: number) {
    return this.deleteUser(id);
  }
}
