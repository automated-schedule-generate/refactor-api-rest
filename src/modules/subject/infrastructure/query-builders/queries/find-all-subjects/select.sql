select (
        select count(*)
        from "subject"
    ) as total,
    coalesce(jsonb_agg(result), '[]'::jsonb) as data
from (
        select cte_subjects.*,
            coalesce(
                jsonb_agg(
                    jsonb_build_object(
                        'id',
                        semester.id,
                        'year',
                        semester.year,
                        'semester',
                        semester.semester,
                        'is_finished',
                        semester.is_finished,
                        'created_at',
                        semester.created_at,
                        'updated_at',
                        semester.updated_at
                    )
                ) filter (
                    where semester.id is not null
                ),
                '[]'::jsonb
            ) as semesters,
            coalesce(
                jsonb_agg(cte_teachers.*) filter (
                    where cte_teachers.user_id is not null
                ),
                '[]'::jsonb
            ) as teachers
        from cte_subjects
            left join "subject-teacher-semester" sts on sts.subject_id = cte_subjects.id
            left join cte_teachers on cte_teachers.user_id = sts.teacher_id
            left join semester on semester.id = sts.semester_id
        group by cte_subjects.id,
            cte_subjects.is_active,
            cte_subjects.name,
            cte_subjects.workload,
            cte_subjects.is_optional,
            cte_subjects.prerequisite_id,
            cte_subjects.course_id,
            cte_subjects."created_at",
            cte_subjects."updated_at",
            cte_subjects.prerequisite,
            cte_subjects.course
        order by cte_subjects.name asc
    ) as result