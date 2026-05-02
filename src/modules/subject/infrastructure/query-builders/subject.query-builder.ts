import { Injectable, OnModuleInit } from '@nestjs/common';
import * as path from 'node:path';
import { generateWhereValueToSearchByColumn } from 'src/commons/utils/generate-where-value-to-search-by-column.util';
import { loadSqlQueries } from 'src/commons/utils/load-sql-queries.util';
import { normalizeSql } from 'src/commons/utils/normalize-sql.util';

@Injectable()
export class SubjectQueryBuilder implements OnModuleInit {
  private queries: Record<string, string> = {};

  async onModuleInit() {
    this.queries = await loadSqlQueries(
      path.join(import.meta?.dirname ?? '', 'queries', 'find-all-subjects'),
    );
  }

  findById(id: string, with_course: boolean = false) {
    const wheres = ['subject.id = :subject_id'];
    const query = `
        with cte_subjects as (
            ${with_course ? this.queries['cte-subjects-with-course'] : this.queries['cte-subjects']}
            where ${wheres.join(' and ')}
        ),
        cte_teachers as (
            ${this.queries['cte-teachers']}
        )
        ${this.queries['select']}
    `;

    const replacements = {
      subject_id: id,
    };

    return {
      query: normalizeSql(query),
      replacements,
    };
  }

  findAll(
    pagination?: {
      page: number;
      limit: number;
    },
    with_course: boolean = false,
    course_id?: string,
    prerequisite_id?: string,
    search?: string,
  ) {
    let limit: number | null = null;
    let offset: number | null = null;
    if (pagination) {
      limit = pagination.limit;
      offset = (pagination.page - 1) * pagination.limit;
    }

    const wheres: string[] = [];
    if (course_id) {
      wheres.push('subject.course_id = :course_id');
    }
    if (prerequisite_id) {
      wheres.push('subject.prerequisite_id = :prerequisite_id');
    }

    if (search) {
      wheres.push(generateWhereValueToSearchByColumn('subject."name"', search));
    }

    const query = `
        with cte_subjects as (
            ${with_course ? this.queries['cte-subjects-with-course'] : this.queries['cte-subjects']}
            ${wheres.length > 0 ? `where ${wheres.join(' and ')}` : ''}
            order by subject.name asc
            ${limit !== null && offset !== null ? 'limit :limit offset :offset' : ''}
        ),
        cte_teachers as (
            ${this.queries['cte-teachers']}
        )
        ${this.queries['select']}
    `;

    const replacements = {
      limit,
      offset,
      course_id,
      prerequisite_id,
    };

    return {
      query: normalizeSql(query),
      replacements,
    };
  }
}
