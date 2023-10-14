import { when } from './dist';

describe("When.js", () => {
  it("should get 'bingo its 11'", () => {
    const result = when('11', {
      "12": () => "not eleven?",
      '11': () => "Bingo! It's eleven."
    });
    expect(result).toEqual("Bingo! It's eleven.");
  });

  it("should get 12", () => {
    const result = when(12, {
      "cat": () => "Cat really?",
      12: (identifier) => String(identifier),
    });
    expect(result).toEqual('12');
  });

  it("should get get the else value", () => {
    const result = when('13', {
      '11': () => "Bingo! It's eleven.",
      else: () => 'Else value'
    });
    expect(result).toEqual("Else value");
  });

  it("should be able to check 'array values'", () => {
    const result = when('2', {
      '11': () => "Bingo! It's eleven.",
      "1,2,3": () => "Array value",
    });
    expect(result).toEqual("Array value");
  });

  it("should be able to check 'array values with more complex strings'", () => {
    const result = when('three', {
      "cat": () => "Cat really?",
      12: () => "Close but not close enough.",
      '11': () => "Bingo! It's eleven.",
      else: () => 'Else value',
      "one,two,three": () => "Array value",
    });
    expect(result).toEqual("Array value");
  });

  it("should handle the case where no operator matches", () => {
    const result = when('15', {
      "cat": () => "Cat really?",
      12: () => "Close but not close enough.",
      '11': () => "Bingo! It's eleven.",
      "one,two,three": () => "Array value",
    });
    expect(result).toEqual("No matches");
  });

  it("can use a nested when", () => {
    const result = when('11', {
      '11': (identifier) => when(identifier, {
        '11': () => 'Nested'
      }),
    });
    expect(result).toEqual("Nested");
  });

  it('should check via conditionals', () => {
    const result = when({
      [String('11' === '11')]: () => "true value",
      [String('12' === '11')]: () => "false value",
    }, true);
    expect(result).toEqual('true value');
  })

});