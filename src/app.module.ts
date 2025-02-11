import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngestionModule } from './ingestion/ingestion.module';
import { AiModule } from './ai/ai.module';
import { VectorDbModule } from './vector-db/vector-db.module';
import { ConversationModule } from './conversation/conversation.module';
import { ReportModule } from './report/report.module';
import { PodcastModule } from './podcast/podcast.module';

@Module({
  imports: [IngestionModule, AiModule, VectorDbModule, ConversationModule, ReportModule, PodcastModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
