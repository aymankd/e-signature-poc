import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { PandaDocAPIService } from './pandadoc.service';

@Module({
  imports: [HttpModule],
  providers: [PandaDocAPIService],
  exports: [PandaDocAPIService],
})
export class PandaDocAPIModule {}
