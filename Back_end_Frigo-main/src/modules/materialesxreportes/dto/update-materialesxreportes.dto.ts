import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialesXReportesDto } from './create-materialesxreportes.dto';

export class UpdateMaterialesXReportesDto extends PartialType(CreateMaterialesXReportesDto) {}