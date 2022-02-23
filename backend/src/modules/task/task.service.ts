import { Injectable } from "@nestjs/common";
import { DynamicPool } from "node-worker-threads-pool";
import { Func } from "node-worker-threads-pool/dist/types";
import { deserializeTree } from "src/utils/treeSerializer.util";
import { CommentEntity } from "../comment/comment.entity";

@Injectable()
export class TaskService {

    private readonly threadPool = new DynamicPool(4);

    // general method to execute any task with any param
    async executeTask<FuncType extends Func>(task: FuncType, param: any) {
        return this.threadPool.exec({ task, param });
    }

    // executes the cpu-bounded deserialize tree task
    async executeDeserializeTreeTask(nodes: CommentEntity[]) {
        return await this.executeTask(deserializeTree, nodes);
    }
}