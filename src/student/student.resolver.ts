import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { CreateStudentInput, GetStudentByIdInput } from './student.input';
import { Student } from './student.graphql';
import { UseGuards } from '@nestjs/common';
import { NSMAuthGuard } from '@/auth/auth.guard';

@Resolver('Student')
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @UseGuards(NSMAuthGuard)
  @Query(() => [Student])
  getStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @UseGuards(NSMAuthGuard)
  @Query(() => Student)
  getStudentById(@Args('input') input: GetStudentByIdInput): Promise<Student> {
    return this.studentService.getStudentById(input);
  }

  @Mutation(() => Student)
  createStudent(@Args('input') input: CreateStudentInput): Promise<Student> {
    return this.studentService.createStudent(input);
  }
}
