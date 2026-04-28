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
    null as course
from subject
    left join subject prerequisite on prerequisite.id = subject.prerequisite_id