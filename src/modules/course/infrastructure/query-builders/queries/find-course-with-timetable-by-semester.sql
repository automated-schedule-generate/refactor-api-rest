with cte_timetables as (
	select timetable.*
	from timetable
	where timetable.semester_id = :semester_id
	order by timetable.generation_count asc
	limit 1
), cte_timetable_entry as (
	select timetable_entry.*
	from timetable_entry
		inner join cte_timetables on cte_timetables.id = timetable_entry.timetable_id { adding_conditions }
	order by timetable_entry.teacher_name asc,
		timetable_entry.subject_name asc
),
cte_result as (
	select course.*,
		json_agg(cte_timetable_entry) as timetable_entries,
		cte_timetables.generated_at
	from course
		inner join cte_timetable_entry on cte_timetable_entry.course_id = course.id
		inner join cte_timetables on 1 = 1
	group by course.id,
		cte_timetables.generated_at
	order by course.name asc
)
select count(cte_result.id) as total,
	json_agg(cte_result.*) as result
from cte_result;