import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateHolidayDto } from 'src/dto/create-holiday.dto';
import { UpdateHolidayDto } from 'src/dto/update-holiday.dto';
import {
  CreateHolidayService,
  GetHolidayService,
  ListHolidaysService,
  DeleteHolidayService,
  UpdateHolidayService,
} from 'src/services';

@Controller('holidays')
export class HolidaysController {
  constructor(
    private readonly createDepartmentService: CreateHolidayService,
    private readonly getDepartmentService: GetHolidayService,
    private readonly listDepartmentsService: ListHolidaysService,
    private readonly removeDepartmentService: DeleteHolidayService,
    private readonly updateDepartmentService: UpdateHolidayService,
  ) {}

  @Post()
  create(@Body() createHolidayDto: CreateHolidayDto) {
    return this.createDepartmentService.create(createHolidayDto);
  }

  @Post('/massive-load')
  createWithList(@Body() createHolidayDto: CreateHolidayDto[]) {
    return this.createDepartmentService.createWithList(createHolidayDto);
  }

  @Get()
  list() {
    return this.listDepartmentsService.list();
  }

  @Get(':id')
  get(@Param('date') date: Date) {
    return this.getDepartmentService.get(date);
  }

  @Patch(':id')
  update(
    @Param('date') date: Date,
    @Body() updateHolidayDto: UpdateHolidayDto,
  ) {
    return this.updateDepartmentService.update(date, updateHolidayDto);
  }

  @Delete(':id')
  delete(@Param('date') date: Date) {
    return this.removeDepartmentService.delete(date);
  }
}
