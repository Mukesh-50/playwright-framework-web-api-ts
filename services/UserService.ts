import type { APIRequestContext } from '@playwright/test';
import { BaseService } from './BaseService';

/**
 * UserService holds all API calls for the "users" API.
 * API used: https://jsonplaceholder.typicode.com
 */
export class UserService extends BaseService
{
    readonly baseURL: string;

    constructor(request: APIRequestContext)
    {
        super(request);

        this.baseURL = 'https://jsonplaceholder.typicode.com';
    }

    // GET /users/{userId} -> fetch one user
    async getUser(userId: number)
    {
        return await this.get(`${this.baseURL}/users/${userId}`);
    }

}
