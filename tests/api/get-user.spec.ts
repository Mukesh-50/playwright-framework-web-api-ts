import { test, expect } from '../../fixture/apiFixture';

test.describe('User API', { tag: ['@api'] }, () => {

    test('Get user by id', async ({ userService }) =>
    {
        // Call the API through the service (no URL inside the test)
        const response = await userService.getUser(1);

        // Check status
        expect(response.status()).toBe(200);

        expect(response.statusText()).toBe('OK');

        // Check body
        const responseBody = await response.json();

        expect(responseBody.name).toBe('Leanne Graham');

        expect(responseBody.email).toBe('Sincere@april.biz');

        expect(responseBody.address.zipcode).toBe('92998-3874');

        expect(responseBody.address.geo.lat).toBe('-37.3159');
        
        expect(responseBody.address.geo.lng).toBe('81.1496');
    });

});
