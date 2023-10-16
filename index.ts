const checkKeyExists = (key: string, obj: Record<string, Function>): boolean => obj.hasOwnProperty(key);

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
  let keyToUse = condition;

  if (useConditional === true && checkKeyExists('true', conditions)) {
    return conditions['true']();
  }
  const keys = Object.keys(conditions);
  for (let i of keys) {
    const split = key.split(',');
    if (split.length > 1 && split.includes(condition)) {
       return conditions[key]();
    } else {
      const operator = conditions[keyToUse];
      if (!operator && checkKeyExists('else', conditions)) {
        return conditions.else(condition);
      } else if (operator) {
        return operator(condition);
      }
    }
  }
  return "No matches found"
}