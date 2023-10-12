export function when(...args) {
  let condition;
  let conditions;
  let useConditional;

  if (args.length === 2 && typeof args[1] !== 'boolean') {
    condition = args[0];
    conditions = args[1];
    useConditional = false;
  }
  if (args.length === 2 && typeof args[1] === 'boolean') {
    conditions = args[0];
    useConditional = args[1];
    if (!useConditional) {
      throw Error("You must supply a condition value if not using conditionals")
    }
  }
  let keyToUse = condition;

  if (useConditional === true) {
    return conditions['true']();
  }

  Object.keys(conditions)
    .forEach((key) => {
      const split = key.split(',');
      if (split.length > 1) {
        const includesKey = split.includes(condition);
        if (includesKey) {
          keyToUse = key;
        }
      }
    });

  const operator = conditions[keyToUse];
  if (!operator && Object.prototype.hasOwnProperty.call(conditions, 'else')) {
    return conditions.else(condition);
  } else if (operator) {
    return operator(condition);
  } else {
    return "No matches"
  }
}


module.exports = when;