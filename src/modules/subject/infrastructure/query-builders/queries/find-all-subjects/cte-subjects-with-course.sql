select subject.*,
    case
        when prerequisite.id is not null then jsonb_build_object(
            'id',
            prerequisite.id,
            'name',
            prerequisite.name,
            'workload',
            prerequisite.workload,
            'is_optional',
            prerequisite.is_optional,
            'prerequisite_id',
            prerequisite.prerequisite_id,
            'course_id',
            prerequisite.course_id,
            'created_at',
            prerequisite."created_at",
            'updated_at',
            prerequisite."updated_at"
        )
        else null
    end as prerequisite,
    jsonb_build_object(
        'id',
        course.id,
        'name',
        course."name",
        'class_time',
        course.class_time,
        'total_semesters',
        course.total_semesters
    ) as course
from subject
    left join subject prerequisite on prerequisite.id = subject.prerequisite_id
    inner join course on course.id = subject.course_id