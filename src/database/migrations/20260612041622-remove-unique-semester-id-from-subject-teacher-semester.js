//

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.removeConstraint(
      'subject-teacher-semester',
      'subject-teacher-semester_semester_id_fkey',
    );

    await queryInterface.removeConstraint(
      'subject-teacher-semester',
      'subject-teacher-semester_subject_id_fkey',
    );

    await queryInterface.removeConstraint(
      'subject-teacher-semester',
      'subject-teacher-semester_teacher_id_fkey',
    );

    await queryInterface.removeConstraint(
      'subject-teacher-semester',
      'subject-teacher-semester_subject_id_teacher_id_key',
    );

    await queryInterface.removeConstraint(
      'subject-teacher-semester',
      'subject-teacher-semester_semester_id_key',
    );
  },

  async down(queryInterface) {
    await queryInterface.addConstraint('subject-teacher-semester', {
      fields: ['semester_id'],
      type: 'unique',
      name: 'subject-teacher-semester_semester_id_fkey',
    });

    await queryInterface.addConstraint('subject-teacher-semester', {
      fields: ['subject_id', 'teacher_id'],
      type: 'unique',
      name: 'subject-teacher-semester_subject_id_fkey',
    });

    await queryInterface.addConstraint('subject-teacher-semester', {
      fields: ['teacher_id'],
      type: 'unique',
      name: 'subject-teacher-semester_teacher_id_fkey',
    });

    await queryInterface.addConstraint('subject-teacher-semester', {
      fields: ['subject_id', 'teacher_id'],
      type: 'unique',
      name: 'subject-teacher-semester_subject_id_teacher_id_key',
    });

    await queryInterface.addConstraint('subject-teacher-semester', {
      fields: ['semester_id'],
      type: 'unique',
      name: 'subject-teacher-semester_semester_id_key',
    });
  },
};
