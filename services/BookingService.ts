import type { APIRequestContext } from '@playwright/test';
import { BaseService } from './BaseService';

// The shape of a booking, as the Restful Booker API expects it.
export type Booking =
{
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: {
        checkin: string;
        checkout: string;
    };
    additionalneeds?: string;
};

/**
 * BookingService holds all API calls for the Restful Booker API.
 * API used: https://restful-booker.herokuapp.com
 *
 * Update and Delete are protected APIs, so they need the token
 * from createToken(). The token is sent inside the Cookie header.
 */
export class BookingService extends BaseService
{
    readonly baseURL: string;

    constructor(request: APIRequestContext)
    {
        super(request);

        this.baseURL = 'https://restful-booker.herokuapp.com';
    }

    // POST /auth -> log in and get a token
    async createToken(uname: string, pass: string)
    {
        return await this.post(`${this.baseURL}/auth`, { username: uname, password: pass });
    }

    // POST /booking -> create a new booking
    async createBooking(bookingData: Booking)
    {
        return await this.post(`${this.baseURL}/booking`, bookingData);
    }

    // GET /booking/{bookingId} -> read one booking
    async getBooking(bookingId: number)
    {
        return await this.get(`${this.baseURL}/booking/${bookingId}`);
    }

    // PUT /booking/{bookingId} -> replace the whole booking (needs token)
    async updateBooking(bookingId: number, bookingData: Booking, token: string)
    {
        return await this.put(`${this.baseURL}/booking/${bookingId}`, bookingData, {
            Accept: 'application/json',
            Cookie: `token=${token}`
        });
    }

    // DELETE /booking/{bookingId} -> remove the booking (needs token)
    async deleteBooking(bookingId: number, token: string)
    {
        return await this.delete(`${this.baseURL}/booking/${bookingId}`, {
            Cookie: `token=${token}`
        });
    }

}
