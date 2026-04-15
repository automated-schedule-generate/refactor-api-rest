export class CoordinatorEntity {
  constructor(
    public readonly id: string,
    public readonly start: Date,
    public readonly end: Date | null,
    public readonly teacher_id: string,
  ) {}
}
