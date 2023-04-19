import { Status } from './status';

export type Rule = (value: string) => Status;

export const required = (value: string): Status => {
  const result = Boolean(value);

  return {
    valid: result,
    message: result ? undefined : 'This field is required',
  };
};

export function length({
  min,
  max,
}: {
  min: number;
  max: number;
}): Rule {
  return (value: string): Status => {
    const result = Boolean(
      value.length >= min && value.length <= max
    );

    return {
      valid: result,
      message: result
        ? undefined
        : `This field must be between ${min} and ${max}`,
    };
  };
}
