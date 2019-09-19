import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';
import { User } from '~/backend/types/schema.type';

@Entity('user')
export class UserEntity implements User {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;
}
