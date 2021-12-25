import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";

@Module({
    imports: [],
    exports: [TaskService],
    providers: [TaskService]
})
export class TaskModule {}