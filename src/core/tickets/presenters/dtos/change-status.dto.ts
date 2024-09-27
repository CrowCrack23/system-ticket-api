import { IsEnum } from 'class-validator';
import { Status } from '../../domain/types/status.enum';

export class ChangeStatusDto {
  @IsEnum(Status)
  status: Status;
}
