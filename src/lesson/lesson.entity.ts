import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('lessons')
export class LessonEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  studentId: string;
}
