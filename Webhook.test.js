import { when } from './index';

const initialState = { data: null, loading: false }


describe("When.js", () => {
  it("should test a 'reducer method'", () => {
    const result = when('customer.created', {
      'customer.created': () => true,
      'customer.updated': () => false,
    })
    expect(result).toBe(true);
  });
});