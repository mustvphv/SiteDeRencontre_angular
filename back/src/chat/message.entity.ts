import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import {Chat} from './chat.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Chat, chat => chat.id)
    @JoinColumn({ referencedColumnName: 'id' })
    discussion: Chat;

    @Column()
    messageTexte: string;

    @Column()
    messageDate: string;

}
