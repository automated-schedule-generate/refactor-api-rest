select teacher.*,
    jsonb_build_object(
        'id',
        "user".id,
        'name',
        "user".name,
        'email',
        "user".email,
        'cpf',
        "user".cpf,
        'role',
        "user".role,
        'department',
        "user".department,
        'created_at',
        "user".created_at,
        'updated_at',
        "user".updated_at
    ) as "user"
from teacher
    inner join "user" on "user".id = teacher.user_id