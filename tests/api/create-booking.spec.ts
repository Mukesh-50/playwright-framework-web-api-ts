import { test, expect } from '../../fixture/apiFixture';

import bookingData from '../../testdata/api/booking.json';

test.describe('Booking API', { tag: ['@api'] }, () => {


    test('Create a booking', async ({ bookingService }) =>
    {
        const newBooking = bookingData.newBooking;

        const response = await bookingService.createBooking(newBooking);

        // Check status
        expect(response.status()).toBe(200);
        
        expect(response.statusText()).toBe('OK');

        // Check body
        const responseBody = await response.json();

        expect(responseBody.bookingid).toBeGreaterThan(0);

        // The server should save exactly what we sent
        expect(responseBody.booking).toEqual(newBooking);
    });

});
