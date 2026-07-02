with cte_timetable_entry as (
	select timetable_entry.*
	from timetable_entry
		inner join timetable
			on timetable.id = timetable_entry.timetable_id
	where 
		timetable.semester_id = :semester_id
	order by 
		timetable_entry.teacher_name asc,
		timetable_entry.subject_name asc
)
select 
	course.*, 
	json_agg(
		cte_timetable_entry
	) as timetable_entries
from course
	inner join cte_timetable_entry
		on cte_timetable_entry.course_id = course.id
group by 
	course.id
order by 
	course.name asc;