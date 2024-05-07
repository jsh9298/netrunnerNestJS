import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
export declare class BoardsController {
    private boardsService;
    constructor(boardsService: BoardsService);
    getAllBoard(): Promise<Board[]>;
    getBoardById(id: number): Promise<Board>;
    deleteBoard(id: number): Promise<void>;
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
