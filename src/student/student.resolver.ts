import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { CreateStudentInput, GetStudentByIdInput } from './student.input';
import { Student } from './student.graphql';

@Resolver('Student')
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [Student])
  getStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Query(() => Student)
  getStudentById(@Args('input') input: GetStudentByIdInput): Promise<Student> {
    return this.studentService.getStudentById(input);
  }

  @Mutation(() => Student)
  createStudent(@Args('input') input: CreateStudentInput): Promise<Student> {
    return this.studentService.createStudent(input);
  }
}
