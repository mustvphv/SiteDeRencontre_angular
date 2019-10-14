import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Signin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pseudo: string;

    @Column()
    email: string;

    @Column()
    motDePasse: string;

    @Column()
    confirmationMotDePasse: string;

    @Column()
    physiqueGenre: string;

    @Column()
    physiqueTaille: string;

    @Column()
    physiqueCouleurPeau: string;

    @Column()
    physiqueCouleurCheveu: string;

    @Column()
    physiqueCouleurYeux: string;

    @Column()
    preferenceGenre: string;

    @Column()
    preferenceTaille: string;

    @Column()
    preferenceCouleurPeau: string;

    @Column()
    preferenceCouleurCheveu: string;

    @Column()
    preferenceCouleurYeux: string;
}
