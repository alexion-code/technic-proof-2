import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Exclude()
    @Column()
    password: string;

    @Column({unique: true})
    email: string;

    // @Column({default: true})
    // is_ambassador: boolean;

    get name() {
        return `${this.first_name} ${this.last_name}`;
    }
}