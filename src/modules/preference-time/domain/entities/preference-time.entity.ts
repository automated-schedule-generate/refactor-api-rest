export class PreferenceTimeEntity {
  constructor(
    public readonly id: string,
    public readonly preference_id: string,
    public readonly selected_time: string,
  ) {}
}
