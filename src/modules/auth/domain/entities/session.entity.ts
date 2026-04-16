export class SessionEntity {
  constructor(
    public readonly id: string,
    public readonly token: string,
    public readonly refresh_token: string,
    public readonly expires_at: Date,
  ) {}
}
