import { SemesterEnum } from '@enums';
import { Transaction } from 'sequelize';
import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeUpdate,
} from 'sequelize-typescript';

@Table({ tableName: 'semester', underscored: true, timestamps: true })
export class SemesterModel extends Model<
  SemesterModel,
  Partial<SemesterModel>
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(4),
    allowNull: false,
  })
  year: string;

  @Column({
    type: DataType.ENUM(...Object.values(SemesterEnum)),
    defaultValue: SemesterEnum.FIRST,
  })
  semester: SemesterEnum;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_finished: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BeforeUpdate
  static async updateIsFinished(
    instance: SemesterModel,
    options: {
      transaction?: Transaction;
    },
  ) {
    if (instance.is_finished === false) {
      return;
    }

    if (instance.previous('is_finished') === true) {
      return;
    }

    let nextYear = Number(instance.dataValues.year);
    let nextSemester: SemesterEnum = SemesterEnum.FIRST;

    if (instance.dataValues.semester === SemesterEnum.FIRST) {
      nextSemester = SemesterEnum.SECOND;
    } else {
      nextYear += 1;
    }

    const nextSemesterData = {
      year: String(nextYear).padStart(4, '0'),
      semester: nextSemester,
    };

    const semesterFound = await SemesterModel.findOne({
      where: {
        ...nextSemesterData,
      },
    });

    if (!semesterFound) {
      await SemesterModel.create(
        {
          ...nextSemesterData,
          is_finished: false,
        },
        { transaction: options.transaction },
      );
    }
  }
}
