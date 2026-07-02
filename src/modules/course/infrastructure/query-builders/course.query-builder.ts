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

  findCourseWithTimetableBySemester(semester_id: string): {
    query: string;
    replacements: Record<string, string | number | null>;
  } {
    const query = this.queries['find-course-with-timetable-by-semester'];

    const replacements = {
      semester_id,
    };

    return {
      query,
      replacements,
    };
  }
}
