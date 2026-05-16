export class OrganizationEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly user_id: string,
    public readonly is_active: boolean,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}
