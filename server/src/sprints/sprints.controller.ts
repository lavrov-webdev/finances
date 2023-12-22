import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUser } from 'src/interfaces';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  PickType,
} from '@nestjs/swagger';
import {
  SprintResponseDto,
  SprintResponseDetailedInfo,
  SprintResponseWithEnvelopesDto,
  SprintResponseWithTotalSpendingsAndPlainDto,
} from './dto/sprint.response.dto';

@ApiTags('sprints')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Auth is needed' })
@UseGuards(AuthGuard)
@Controller('sprints')
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @Post()
  @ApiCreatedResponse({ type: SprintResponseWithEnvelopesDto })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(
    @Body() createSprintDto: CreateSprintDto,
    @Request() req: RequestWithUser,
  ): Promise<SprintResponseWithEnvelopesDto> {
    return this.sprintsService.create(createSprintDto, req.user.id);
  }

  @Get()
  @ApiOkResponse({ type: [SprintResponseWithTotalSpendingsAndPlainDto] })
  findAll(
    @Request() req: RequestWithUser,
  ): Promise<SprintResponseWithTotalSpendingsAndPlainDto[]> {
    return this.sprintsService.findAll(req.user.id);
  }

  @Get('current')
  @ApiOkResponse({
    type: PickType<SprintResponseDto, 'id'>,
  })
  @ApiNotFoundResponse({ description: 'Sprint not found' })
  findCurrent(
    @Request() req: RequestWithUser,
  ): Promise<Pick<SprintResponseDto, 'id'>> {
    return this.sprintsService.findCurrent(req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({
    type: SprintResponseDetailedInfo,
  })
  @ApiNotFoundResponse({ description: 'Sprint not found' })
  findOne(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<SprintResponseDetailedInfo> {
    return this.sprintsService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SprintResponseDto })
  @ApiNotFoundResponse({ description: 'Sprint not found' })
  update(
    @Param('id') id: string,
    @Body() updateSprintDto: UpdateSprintDto,
    @Request() req: RequestWithUser,
  ): Promise<SprintResponseDto> {
    return this.sprintsService.update(+id, updateSprintDto, req.user.id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SprintResponseDto })
  @ApiNotFoundResponse({ description: 'Sprint not found' })
  remove(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<SprintResponseDto> {
    return this.sprintsService.remove(+id, req.user.id);
  }
}
