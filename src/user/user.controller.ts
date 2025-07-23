import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-aut.guard';
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
  async updateUser(@Param('id') id: number, @Body() body: UserUpdateDTO) {
    return this.userService.updateUser(body, id);
  }
}
