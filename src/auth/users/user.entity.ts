import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'user'})
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    userId: string;
    @Column()
    password: string;
    @Column()
    username: string;
    @Column({ unique: true })
    email: string;
    @Column()
    savepoint : number;   //xml에서의 미션ID
    @Column()
    location : string; //xml의 저장위치, 유저아이디별 디렉토리경로
    @Column()
    score : number;  //점수
    @Column()
    reword : number; //인게임재화
    @Column()
    level : number; //레벨
    //@Column()
    // 상점아이템 구매여부체크
}