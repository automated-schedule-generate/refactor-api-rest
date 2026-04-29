import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  SemesterRepository,
  SubjectRepository,
  SubjectTeacherSemesterRepository,
  TeacherRepository,
} from '@repositories';
import { AddTeacherAndSemesterInSubjectDto } from '@dtos';

@Injectable()
export class AddTeacherAndSemesterInSubjectUseCase {
  private readonly logger = new Logger(
    AddTeacherAndSemesterInSubjectUseCase.name,
  );

  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly subjectTeacherSemesterRepository: SubjectTeacherSemesterRepository,
    private readonly teacherRepository: TeacherRepository,
    private readonly semesterRepository: SemesterRepository,
  ) {}

  async execute(subject_id: string, dto: AddTeacherAndSemesterInSubjectDto) {
    try {
      const subjectExist = await this.subjectRepository.findById(subject_id);

      if (!subjectExist) {
        throw new BadRequestException('Disciplina não encontrada');
      }

      const teacherExist = await this.teacherRepository.findByUserId(
        dto.teacher_id,
      );

      if (!teacherExist) {
        throw new BadRequestException('Professor não encontrado');
      }

      const semesterExist = await this.semesterRepository.findById(
        dto.semester_id,
      );

      if (!semesterExist) {
        throw new BadRequestException('Semestre não encontrado');
      }
      console.log('cheguei aqui');
      await this.subjectTeacherSemesterRepository.register(
        subject_id,
        dto.teacher_id,
        dto.semester_id,
      );

      console.log('cheguei aqui 2');

      return await this.subjectRepository.findById(subject_id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
