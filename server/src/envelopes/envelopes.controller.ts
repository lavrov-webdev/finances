import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EnvelopesService } from './envelopes.service';
import { UpdateEnvelopeDto } from './dto/update-envelope.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { DateTransformer } from 'src/transformers/date.transformer';
import { EnvelopeResponseDto } from './dto/envelope.response.dto';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces';

@ApiTags('envelopes')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Auth is needed' })
@UseGuards(AuthGuard)
@Controller('envelopes')
export class EnvelopesController {
  constructor(private readonly envelopesService: EnvelopesService) {}

  @Patch(':id')
  @ApiOkResponse({ type: EnvelopeResponseDto })
  @ApiNotFoundResponse({ description: 'Envelope not found' })
  update(
    @Param('id') id: string,
    @Body() updateEnvelopeDto: UpdateEnvelopeDto,
    @Request() req: RequestWithUser,
  ): Promise<EnvelopeResponseDto> {
    return this.envelopesService.update(+id, updateEnvelopeDto, req.user.id);
  }

  @ApiParam({ name: 'date', example: '2023-06-23', type: String })
  @Get('by_date/:date')
  @ApiOkResponse({ type: [EnvelopeResponseDto] })
  getByDate(
    @Param('date', DateTransformer)
    date: string,
    @Request() req: RequestWithUser,
  ): Promise<EnvelopeResponseDto[]> {
    return this.envelopesService.getAllByDate(date, req.user.id);
  }
}
