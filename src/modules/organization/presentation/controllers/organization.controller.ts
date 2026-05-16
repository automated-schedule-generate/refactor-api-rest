import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('organization')
@Controller('organization')
export class OrganizationController {}
