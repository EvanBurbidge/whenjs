# When.js

This is a small implementation to mock the `when` functionality that is provided by kotlin. In this library, if a matching case is found, only the code in the respective case block is executed, and execution continues with the next statement after the when block.

This essentially means that we don’t need break statements at the end of each case block.

## Installation

`npm install kotlin-when`

## Usage

### String matching
```javascript
when('11', {
  "12": () => "not eleven?",
  '11': () => "Bingo! It's eleven."
}); // outputs "Bingo! It's eleven."
```

### Number matching
```javascript
when(12, {
  "cat": () => "Cat really?",
  12: (identifier) => String(identifier),
}); // ouputs "12"

```

### Multiple conditions on one line
If we want to run the same function for multiple conditions then we are able to do so by passing a comma separated string of the possible values this is similar to stacking cases in switch.

```javascript
when('2', {
  '11': () => "Bingo! It's eleven.",
  "1,2,3": () => "Multi condition value",
}); // outputs "Multi condition value"
```

### Default cases
Sometimes we may not find the value and have to fallback on an else value to use this feature pass an else keyword and a function.
```javascript
when('three', {
  '11': () => "Bingo! It's eleven.",
  else: () => 'Else value',
});
```

### Nested whens 
Sure why not
```javascript

when('11', {
  '11': (identifier) => when(identifier, {
    '11': () => 'Nested'
  }),
})

```

### Checking with conditions
In order to check boolean conditions we need to first omit the condition value and pass our object as the first argument, then we need to pass true as the second value in order to enable conditional comparisons. We must wrap each key with square brackets and wrap the conditions in a `String()` declaration to convert it to be usable in our code

```javascript
when({
  [String('11' === '11')]: () => "true value",
  [String('12' === '11')]: () => "false value",
}, true)

```

