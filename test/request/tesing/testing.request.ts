import request from "supertest";

export class TestingRequest {
  constructor(private readonly server: any) {}

  async dropDb() {
    await request(this.server)
      .delete()
  }
}