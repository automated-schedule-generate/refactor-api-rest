import { Injectable, OnModuleInit } from '@nestjs/common';
import * as path from 'node:path';
import { loadSqlQueries } from 'src/commons/utils/load-sql-queries.util';

@Injectable()
export class CourseQueryBuilder implements OnModuleInit {
  private queries: Record<string, string> = {};

  async onModuleInit() {
    this.queries = await loadSqlQueries(
      path.join(import.meta?.dirname ?? '', 'queries'),
    );
  }

  findCourseWithTimetableBySemester(
    semester_id: string,
    course_id?: string,
  ): {
    query: string;
    replacements: Record<string, string | number | null | undefined>;
  } {
    const conditions: string[] = [];

    if (course_id) {
      conditions.push('timetable_entry.course_id = :course_id');
    }

    let query = this.queries['find-course-with-timetable-by-semester'];

    if (conditions.length > 0) {
      query = query.replace(
        '{ adding_conditions }',
        'where ' + conditions.join(' and '),
      );
    } else {
      query = query.replace('{ adding_conditions }', '');
    }

    const replacements = {
      semester_id,
      course_id,
    };

    return {
      query,
      replacements,
    };
  }
}
