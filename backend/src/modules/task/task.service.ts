import { Injectable } from "@nestjs/common";
import { DynamicPool } from "node-worker-threads-pool";
import { Func } from "node-worker-threads-pool/dist/types";
import { deserializeTree, NodeObj } from "src/utils/tree.serializer";

@Injectable()
export class TaskService {

    private readonly threadPool = new DynamicPool(4);

    // general method to execute any task with any param
    async executeTask<FuncType extends Func>(task: FuncType, param: any) {
        return await this.threadPool.exec({ task, param });
    }

    // executes the cpu-bounded deserialize tree task
    async executeDeserializeTreeTask(nodes: NodeObj[]) {
        return await this.executeTask(deserializeTree, nodes);
    }
}