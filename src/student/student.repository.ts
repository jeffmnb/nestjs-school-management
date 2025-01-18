import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { StudentEntity } from '@/student/student.entity';

@Injectable()
export class StudentRepository extends Repository<StudentEntity> {}
