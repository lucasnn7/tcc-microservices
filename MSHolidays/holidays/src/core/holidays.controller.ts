import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateHolidayDto } from './dto/create.holiday.dto';
import { UpdateHolidayDto } from './dto/update.holiday.dto';
import { HolidayDocument } from './schemas/holiday.schema';
import {
  CreateHolidayService,
  DeleteHolidayService,
  GetHolidayService,
  ListHolidaysService,
  UpdateHolidayService,
} from './services';

@Controller()
export class HolidaysController {
  constructor(
    private readonly createHolidayService: CreateHolidayService,
    private readonly deleteHolidayService: DeleteHolidayService,
    private readonly getHolidayService: GetHolidayService,
    private readonly listHolidaysService: ListHolidaysService,
    private readonly updateHolidayService: UpdateHolidayService,
  ) {}

  @Post()
  create(@Body() createHolidayDto: CreateHolidayDto): Promise<HolidayDocument> {
    return this.createHolidayService.create(createHolidayDto);
  }

  @Get()
  list(): Promise<HolidayDocument[]> {
    return this.listHolidaysService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.getHolidayService.get(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHolidayDto: UpdateHolidayDto,
  ): Promise<HolidayDocument> {
    return this.updateHolidayService.update(id, updateHolidayDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteHolidayService.delete(id);
  }
}
