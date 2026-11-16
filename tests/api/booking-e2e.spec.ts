import { test, expect } from '../../fixture/apiFixture';

import bookingData from '../../testdata/api/booking.json';

/**
 * End-to-End booking flow:
 *   Create Token -> Create Booking -> Update -> Delete -> Verify Deleted
 *
 * Every test needs data from the previous one (token, bookingId),
 * so the tests run in serial mode (one by one, in order).
 */
test.describe('End-to-End Booking Flow', { tag: ['@api'] }, () => {

    test.describe.configure({ mode: 'serial' });

    // Shared between the tests below
    let token: string;
    let bookingId: number;

    test('Create Token', async ({ bookingService }) =>
    {
        const response = await bookingService.createToken(bookingData.admin.username, bookingData.admin.password);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        token = responseBody.token;

        expect(typeof token).toBe('string');

        expect(token).toBeTruthy();
    });

    test('Create Booking', async ({ bookingService }) =>
    {
        const response = await bookingService.createBooking(bookingData.newBooking);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        bookingId = responseBody.bookingid;

        expect(bookingId).toBeGreaterThan(0);
        
        expect(responseBody.booking.totalprice).toBe(bookingData.newBooking.totalprice);
    });

    test('Update Booking', async ({ bookingService }) =>
    {
        const updatedBooking = bookingData.updatedBooking;

        const response = await bookingService.updateBooking(bookingId, updatedBooking, token);

        expect(response.status()).toBe(200);

        expect(response.statusText()).toBe('OK');

        // For PUT, the server returns the updated booking directly
        const responseBody = await response.json();

        expect(responseBody).toEqual(updatedBooking);
    });

    test('Delete Booking', async ({ bookingService }) =>
    {
        const response = await bookingService.deleteBooking(bookingId, token);

        // Note: Restful Booker returns 201 Created for a delete
        expect(response.status()).toBe(201);

        expect(response.statusText()).toBe('Created');
    });

    test('Verify Booking Deletion', async ({ bookingService }) =>
    {
        const response = await bookingService.getBooking(bookingId);

        expect(response.status()).toBe(404);
        
        expect(response.statusText()).toBe('Not Found');
    });

});
