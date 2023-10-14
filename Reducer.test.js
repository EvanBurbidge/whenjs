const when = require("./whenjs");

const initialState = { data: null, loading: false }
const reducer = (state = initialState, action) => when(action.type, {
  'FETCHING': () => ({ ...state, loading: true }),
  'FETCHING_DONE': () => ({ ...state, loading: false, data: [1, 2, 3] }),
})

describe("When.js", () => {
  it("should test a 'reducer method'", () => {
    const result = reducer(initialState, { type: 'FETCHING' });
    expect(result.loading).toBe(true);
  });
  it("should test a 'reducer method'", () => {
    const result = reducer(initialState, { type: 'FETCHING_DONE' });
    expect(result.loading).toBe(false);
    expect(JSON.stringify(result.data)).toBe(JSON.stringify([1, 2, 3]));
  });
});