import type { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * BaseService is the parent of every API service class.
 *
 * Just like BasePage holds common browser actions (click, type...),
 * BaseService holds the common API actions: GET, POST, PUT and DELETE.
 *
 * "request" is Playwright's built-in HTTP client. Every method returns the
 * full response, so the test can check status, body and headers.
 */
export class BaseService
{
    request: APIRequestContext;

    constructor(request: APIRequestContext)
    {
        this.request = request;
    }

    // Record<string, string> means "an object whose keys and values are strings", e.g. { Cookie: 'token=abc' }
    async get(url: string, headers: Record<string, string> = {}): Promise<APIResponse>
    {
        console.log(`**** GET ${url} ****`);
        return await this.request.get(url, { headers: headers });
    }

    async post(url: string, body: object, headers: Record<string, string> = {}): Promise<APIResponse>
    {
        console.log(`**** POST ${url} ****`);
        return await this.request.post(url, { data: body, headers: headers });
    }

    async put(url: string, body: object, headers: Record<string, string> = {}): Promise<APIResponse>
    {
        console.log(`**** PUT ${url} ****`);
        return await this.request.put(url, { data: body, headers: headers });
    }

    // Complete this BaseServer For Patch Request

    async delete(url: string, headers: Record<string, string> = {}): Promise<APIResponse>
    {
        console.log(`**** DELETE ${url} ****`);
        return await this.request.delete(url, { headers: headers });
    }

}
