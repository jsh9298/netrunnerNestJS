import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";
import { CustomRepository } from "src/typeorm-ex/typeorm-ex.decorator";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board>{
    async createBoard(createBoardDto:CreateBoardDto):Promise<Board>{
        const {title,description}=createBoardDto;
        const board = new Board();
        board.title = title;
        board.description = description;
        board.status = BoardStatus.PUBLIC;
        await board.save();
        return board;
    }
}