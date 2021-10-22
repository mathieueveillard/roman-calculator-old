type Digit = "I" | "V" | "X" | "L" | "C" | "D" | "M";

const order: Digit[] = ["I", "V", "X", "L", "C", "D", "M"];

export interface RomanNumeral {
  digit: Digit;
  minus?: Digit;
  plus?: RomanNumeral;
}

type Sequence = Digit[];

export interface Replacement {
  low: Sequence;
  high: RomanNumeral;
}

const replacements: Replacement[] = [
  {
    low: ["I", "I", "I", "I", "I"],
    high: {
      digit: "V",
    },
  },
  {
    low: ["I", "I", "I", "I"],
    high: {
      digit: "V",
      minus: "I",
    },
  },
  {
    low: ["V", "I", "V"],
    high: {
      digit: "X",
      minus: "I",
    },
  },
  {
    low: ["V", "V"],
    high: {
      digit: "X",
    },
  },
  {
    low: ["X", "X", "X", "X", "X"],
    high: {
      digit: "L",
    },
  },
  {
    low: ["X", "X", "X", "X"],
    high: {
      digit: "L",
      minus: "X",
    },
  },
  {
    low: ["L", "X", "L"],
    high: {
      digit: "C",
      minus: "X",
    },
  },
  {
    low: ["L", "L"],
    high: {
      digit: "C",
    },
  },
  {
    low: ["C", "C", "C", "C", "C"],
    high: {
      digit: "D",
    },
  },
  {
    low: ["C", "C", "C", "C"],
    high: {
      digit: "D",
      minus: "C",
    },
  },
  {
    low: ["D", "C", "D"],
    high: {
      digit: "M",
      minus: "C",
    },
  },
  {
    low: ["D", "D"],
    high: {
      digit: "M",
    },
  },
];

export function add(a: string, b: string): string {
  const romanNumeralA = toRomanNumeral(a);
  const romanNumeralB = toRomanNumeral(b);
  const result = addRomanNumerals(romanNumeralA, romanNumeralB);
  return toString(result);
}

export function toString({ minus, digit, plus }: RomanNumeral): string {
  if (minus) {
    return minus + toString({ digit, plus });
  }
  if (plus) {
    return digit + toString(plus);
  }
  return digit;
}

export function toRomanNumeral(s: string): RomanNumeral {
  return s
    .split("")
    .map(toDigit)
    .reduceRight<RomanNumeral>((numeral, digit) => {
      if (!numeral) {
        return {
          digit,
        };
      }
      if (isBefore(digit, numeral.digit)) {
        return {
          ...numeral,
          minus: digit,
        };
      }
      return {
        digit,
        plus: numeral,
      };
    }, undefined);
}

export function addRomanNumerals(a: RomanNumeral, b: RomanNumeral): RomanNumeral {
  const raw = addRomanNumeralsWithoutReplacements(a, b);
  return proceedToReplacements(raw);
}

export function addRomanNumeralsWithoutReplacements(a: RomanNumeral, b: RomanNumeral): RomanNumeral {
  const expandedA = expandFirstDigit(a);
  const expandedB = expandFirstDigit(b);
  if (isLower(expandedA, expandedB)) {
    return addRomanNumeralsWithoutReplacements(expandedB, expandedA);
  }
  if (!expandedA.plus) {
    return {
      ...expandedA,
      plus: expandedB,
    };
  }
  return {
    ...expandedA,
    plus: addRomanNumeralsWithoutReplacements(expandedA.plus, expandedB),
  };
}

export function expandFirstDigit(n: RomanNumeral): RomanNumeral {
  const { minus, digit, plus } = n;
  if (!minus) {
    return n;
  }
  const { low } = replacements.find(({ high }) => equal(high, { minus, digit }));
  const expanded = buildFromSequence(low);
  if (plus) {
    return append(expanded, plus);
  }
  return expanded;
}

export function proceedToReplacements(n: RomanNumeral): RomanNumeral {
  return replacements.reduce((acc, replacement) => replaceRecursively(replacement)(acc), n);
}

export function replaceRecursively(replacement: Replacement) {
  return function (n: RomanNumeral): RomanNumeral {
    const { minus, digit, plus } = replace(replacement)(n);
    if (!plus) {
      return {
        minus,
        digit,
      };
    }
    return {
      minus,
      digit,
      plus: replaceRecursively(replacement)(plus),
    };
  };
}

export function replace(replacement: Replacement) {
  return function internal(n: RomanNumeral, replacementSequence: Sequence = replacement.low): RomanNumeral {
    const { digit, plus } = n;
    const [match, ...nextReplacementSequence] = replacementSequence;
    const { high } = replacement;
    if (digit !== match) {
      return n;
    }
    if (replacementSequence.length === 1) {
      return append(high, plus);
    }
    if (!plus) {
      return n;
    }
    const subresult = internal(plus, nextReplacementSequence);
    if (equal(plus, subresult)) {
      return n;
    }
    return subresult;
  };
}

function isLower(a: RomanNumeral, b: RomanNumeral): boolean {
  return isBefore(a.digit, b.digit);
}

function isBefore(a: Digit, b: Digit): boolean {
  return order.indexOf(a) < order.indexOf(b);
}

function toDigit(s: string): Digit {
  return s as Digit;
}

export function equal(a: RomanNumeral, b: RomanNumeral): boolean {
  if (a.digit !== b.digit || a.minus !== b.minus) {
    return false;
  }
  if (!!a.plus && !!b.plus) {
    return equal(a.plus, b.plus);
  }
  return !a.plus && !b.plus;
}

function append(a: RomanNumeral, b: RomanNumeral): RomanNumeral {
  if (!a.plus) {
    return {
      ...a,
      plus: b,
    };
  }
  return {
    ...a,
    plus: append(a.plus, b),
  };
}

function buildFromSequence(sequence: Sequence): RomanNumeral {
  return sequence.reduceRight<RomanNumeral>((numeral, digit) => {
    if (!numeral) {
      return {
        digit,
      };
    }
    return {
      digit,
      plus: numeral,
    };
  }, undefined);
}
