export class TeacherEntity {
  constructor(
    public readonly user_id: string,
    public readonly special_need: boolean,
    public readonly description_special_need: string | null,
    public readonly observation: string | null,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}

  toJSON() {
    return {
      ...this,
      description_special_need:
        this.description_special_need !== null
          ? this.description_special_need
          : undefined,
      observation: this.observation !== null ? this.observation : undefined,
    };
  }
}
