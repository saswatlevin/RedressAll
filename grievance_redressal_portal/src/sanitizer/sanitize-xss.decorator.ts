import { Transform } from 'class-transformer';
import xss from 'xss';

export function SanitizeXss(): PropertyDecorator {
  return Transform(
    ({ value }) => {
      if (typeof value === 'string') {
        return xss(value);
      }

      if (Array.isArray(value)) {
        return value.map(item =>
          typeof item === 'string' ? xss(item) : item,
        );
      }

      return value;
    },
    { toClassOnly: true },
  );
}