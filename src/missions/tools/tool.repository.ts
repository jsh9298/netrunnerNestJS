import { Repository } from "typeorm";
import { Tool} from "./tool.entity";
import { CustomRepository } from "src/typeorm-ex/typeorm-ex.decorator";

@CustomRepository(Tool)
export class ToolsRepository extends Repository<Tool>{}  