export function when<T>(...args: any): T | string {
  let condition: string = '';
  let conditions: Record<string, (e?: any) => T> = {};
  let useConditional: boolean = false;

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

  if (useConditional === true) {
    if (conditions.hasOwnProperty('true')) {
      return conditions['true']();
    }
  }
  let operator;
  const keys = Object.keys(conditions);
  for(let i of keys) {
    if (i.includes(',')) {
      const split = i.split(',');
      if (split.includes(condition)) {
        operator = conditions[i]
        break;
      }
    }
    if (i.includes(condition)) {
      operator = conditions[i];
      break;
    }
  }

  if (!operator && Object.prototype.hasOwnProperty.call(conditions, 'else')) {
    if (conditions.hasOwnProperty('else')) {
      return conditions.else(condition);
    }
  } else if (operator) {
    return operator(condition);
  }

  return "No matches"
}
