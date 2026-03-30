export class SessionEntity {
  constructor(
    private readonly id: string,
    private readonly token: string,
    private readonly refresh_token: string,
    private readonly expires_at: Date,
  ) {}
}
