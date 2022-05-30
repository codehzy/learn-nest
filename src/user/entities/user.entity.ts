import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
