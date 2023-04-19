import { Rule } from '@/interfaces/rule';
import { Status } from '@/interfaces/status';

export function validate(value: string, rules: Rule[]): Status {
  for (const rule of rules) {
    const result = rule(value);

    if (!result.valid) {
      return result;
    }
  }

  return {
    valid: true,
  };
}
