export class PermissionEntity {
  constructor(
    public readonly id: string,
    public readonly path: string,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}
