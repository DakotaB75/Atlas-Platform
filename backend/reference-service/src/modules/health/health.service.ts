import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    constructor() {}

    healthCheck(): { status: string } {
        return {
            status: "healthy"
        }
    }
}
