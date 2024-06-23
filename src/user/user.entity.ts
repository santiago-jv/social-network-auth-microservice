import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
  
  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({ default: true, name: 'is_active'})
  isActive: boolean;
}