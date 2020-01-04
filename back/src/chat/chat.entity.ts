import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pseudoSource: string;

    @Column()
    pseudoDest: string;

    @Column()
    message1Texte: string;

    @Column()
    message1Date: string;

    @Column()
    message2Texte: string;

    @Column()
    message2Date: string;

    @Column()
    message3Texte: string;

    @Column()
    message3Date: string;

    @Column()
    message4Texte: string;

    @Column()
    message4Date: string;

    @Column()
    message5Texte: string;

    @Column()
    message5Date: string;

    @Column()
    message6Texte: string;

    @Column()
    message6Date: string;

    @Column()
    message7Texte: string;

    @Column()
    message7Date: string;

    @Column()
    message8Texte: string;

    @Column()
    message8Date: string;

    @Column()
    message9Texte: string;

    @Column()
    message9Date: string;

    @Column()
    message10Texte: string;

    @Column()
    message10Date: string;

}
