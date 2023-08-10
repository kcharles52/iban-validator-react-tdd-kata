import { describe, expect, it, vi } from 'vitest';

import { createIbanValidationRequest } from '../IbanValidationService';

describe('IbanValidationService', () => {
    describe('api adapter', () => {
        it('make request and return response', async () => {
            const inputProps = { iban: 'x' };
            const spy = vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () =>
                        Promise.resolve({
                            iban: inputProps.iban,
                            flags: [],
                        }),
                } as Response),
            );
            const requestOptions = { request: spy };

            const result = await createIbanValidationRequest(inputProps, requestOptions)();

            expect(spy).toHaveBeenCalledWith('http://localhost:9000/validate?iban=x', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            expect(result).toEqual({
                iban: 'x',
                flags: [],
            });
        });
    });
});
