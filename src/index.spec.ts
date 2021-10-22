import {
  add,
  addRomanNumerals,
  toRomanNumeral,
  RomanNumeral,
  toString,
  proceedToReplacements,
  equal,
  expandFirstDigit,
  replace,
  Replacement,
  replaceRecursively,
} from ".";

const I: RomanNumeral = {
  digit: "I",
};

const II: RomanNumeral = {
  digit: "I",
  plus: {
    digit: "I",
  },
};

const III: RomanNumeral = {
  digit: "I",
  plus: {
    digit: "I",
    plus: {
      digit: "I",
    },
  },
};

const IV: RomanNumeral = {
  digit: "V",
  minus: "I",
};

const V: RomanNumeral = {
  digit: "V",
};

const VI: RomanNumeral = {
  digit: "V",
  plus: {
    digit: "I",
  },
};

const VII: RomanNumeral = {
  digit: "V",
  plus: {
    digit: "I",
    plus: {
      digit: "I",
    },
  },
};

const IX: RomanNumeral = {
  digit: "X",
  minus: "I",
};

const X: RomanNumeral = {
  digit: "X",
};

const XIV: RomanNumeral = {
  digit: "X",
  plus: {
    digit: "V",
    minus: "I",
  },
};

const XV: RomanNumeral = {
  digit: "X",
  plus: {
    digit: "V",
  },
};

const XLV: RomanNumeral = {
  digit: "L",
  minus: "X",
  plus: {
    digit: "V",
  },
};

const XC: RomanNumeral = {
  digit: "C",
  minus: "X",
};

const C: RomanNumeral = {
  digit: "C",
};

const CV: RomanNumeral = {
  digit: "C",
  plus: {
    digit: "V",
  },
};

const CX: RomanNumeral = {
  digit: "C",
  plus: {
    digit: "X",
  },
};

const LXII: RomanNumeral = {
  digit: "L",
  plus: {
    digit: "X",
    plus: {
      digit: "I",
      plus: {
        digit: "I",
      },
    },
  },
};

const CLXXII: RomanNumeral = {
  digit: "C",
  plus: {
    digit: "L",
    plus: {
      digit: "X",
      plus: {
        digit: "X",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
          },
        },
      },
    },
  },
};

const CD: RomanNumeral = {
  digit: "D",
  minus: "C",
};

const D: RomanNumeral = {
  digit: "D",
};

const CM: RomanNumeral = {
  digit: "M",
  minus: "C",
};

const M: RomanNumeral = {
  digit: "M",
};

describe("addRomanNumerals", function () {
  test("I + I = II", function () {
    expect(addRomanNumerals(I, I)).toEqual(II);
  });

  test("I + II = III", function () {
    expect(addRomanNumerals(I, II)).toEqual(III);
  });

  test("II + I = III", function () {
    expect(addRomanNumerals(II, I)).toEqual(III);
  });

  test("V + I = VI", function () {
    expect(addRomanNumerals(V, I)).toEqual(VI);
  });

  test("I + V = VI", function () {
    expect(addRomanNumerals(I, V)).toEqual(VI);
  });

  test("CX + LXII = CLXXII", function () {
    expect(addRomanNumerals(CX, LXII)).toEqual(CLXXII);
  });

  test("III + II = V", function () {
    expect(addRomanNumerals(III, II)).toEqual(V);
  });

  test("IV + I = V", function () {
    expect(addRomanNumerals(IV, I)).toEqual(V);
  });

  test("[control] IV + II = VI", function () {
    expect(addRomanNumerals(IV, II)).toEqual(VI);
  });
});

describe("expandFirstDigit", function () {
  test("V => V", function () {
    expect(expandFirstDigit(V)).toEqual(V);
  });

  test("IV => IIII", function () {
    expect(expandFirstDigit(IV)).toEqual({
      digit: "I",
      plus: {
        digit: "I",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
          },
        },
      },
    });
  });

  test("XLV => XXXXV", function () {
    expect(expandFirstDigit(XLV)).toEqual({
      digit: "X",
      plus: {
        digit: "X",
        plus: {
          digit: "X",
          plus: {
            digit: "X",
            plus: {
              digit: "V",
            },
          },
        },
      },
    });
  });
});

describe("replace", function () {
  const replacement: Replacement = {
    low: ["I", "I", "I", "I", "I"],
    high: {
      digit: "V",
    },
  };

  test("I => I", function () {
    expect(
      replace(replacement)({
        digit: "I",
      })
    ).toEqual(I);
  });

  test("IIII => IIII", function () {
    expect(
      replace(replacement)({
        digit: "I",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
            plus: {
              digit: "I",
            },
          },
        },
      })
    ).toEqual({
      digit: "I",
      plus: {
        digit: "I",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
          },
        },
      },
    });
  });

  test("IIIII => V", function () {
    expect(
      replace(replacement)({
        digit: "I",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
            plus: {
              digit: "I",
              plus: {
                digit: "I",
              },
            },
          },
        },
      })
    ).toEqual(V);
  });

  test("IIIIII => VI", function () {
    expect(
      replace(replacement)({
        digit: "I",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
            plus: {
              digit: "I",
              plus: {
                digit: "I",
                plus: {
                  digit: "I",
                },
              },
            },
          },
        },
      })
    ).toEqual(VI);
  });

  test("[control] CIIIII => CIIIII", function () {
    expect(
      replace(replacement)({
        digit: "C",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
            plus: {
              digit: "I",
              plus: {
                digit: "I",
                plus: {
                  digit: "I",
                },
              },
            },
          },
        },
      })
    ).toEqual({
      digit: "C",
      plus: {
        digit: "I",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
            plus: {
              digit: "I",
              plus: {
                digit: "I",
              },
            },
          },
        },
      },
    });
  });
});

describe("replaceRecursively", function () {
  const replacement: Replacement = {
    low: ["I", "I", "I", "I", "I"],
    high: {
      digit: "V",
    },
  };

  test("IIIIIIIIII => VV", function () {
    expect(
      replaceRecursively(replacement)({
        digit: "I",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
            plus: {
              digit: "I",
              plus: {
                digit: "I",
                plus: {
                  digit: "I",
                  plus: {
                    digit: "I",
                    plus: {
                      digit: "I",
                      plus: {
                        digit: "I",
                        plus: {
                          digit: "I",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
    ).toEqual({
      digit: "V",
      plus: {
        digit: "V",
      },
    });
  });

  test("CIIIIIIIIII => CVV", function () {
    expect(
      replaceRecursively(replacement)({
        digit: "C",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
            plus: {
              digit: "I",
              plus: {
                digit: "I",
                plus: {
                  digit: "I",
                  plus: {
                    digit: "I",
                    plus: {
                      digit: "I",
                      plus: {
                        digit: "I",
                        plus: {
                          digit: "I",
                          plus: {
                            digit: "I",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
    ).toEqual({
      digit: "C",
      plus: {
        digit: "V",
        plus: {
          digit: "V",
        },
      },
    });
  });
});

describe("proceedToReplacements", function () {
  test("VV => X", function () {
    expect(
      proceedToReplacements({
        digit: "V",
        plus: {
          digit: "V",
        },
      })
    ).toEqual(X);
  });

  test("XIIIII => XV", function () {
    expect(
      proceedToReplacements({
        digit: "X",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
            plus: {
              digit: "I",
              plus: {
                digit: "I",
                plus: {
                  digit: "I",
                },
              },
            },
          },
        },
      })
    ).toEqual(XV);
  });

  test("[control] VIIIII => X", function () {
    expect(
      proceedToReplacements({
        digit: "V",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
            plus: {
              digit: "I",
              plus: {
                digit: "I",
                plus: {
                  digit: "I",
                },
              },
            },
          },
        },
      })
    ).toEqual(X);
  });

  test("IIII => IV", function () {
    expect(
      proceedToReplacements({
        digit: "I",
        plus: {
          digit: "I",
          plus: {
            digit: "I",
            plus: {
              digit: "I",
            },
          },
        },
      })
    ).toEqual(IV);
  });

  test("VIV => IX", function () {
    expect(
      proceedToReplacements({
        digit: "V",
        plus: {
          digit: "I",
          plus: {
            digit: "V",
          },
        },
      })
    ).toEqual(IX);
  });

  test("LXL => XC", function () {
    expect(
      proceedToReplacements({
        digit: "L",
        plus: {
          digit: "X",
          plus: {
            digit: "L",
          },
        },
      })
    ).toEqual(XC);
  });

  test("LL => C", function () {
    expect(
      proceedToReplacements({
        digit: "L",
        plus: {
          digit: "L",
        },
      })
    ).toEqual(C);
  });

  test("CCCC => CD", function () {
    expect(
      proceedToReplacements({
        digit: "C",
        plus: {
          digit: "C",
          plus: {
            digit: "C",
            plus: {
              digit: "C",
            },
          },
        },
      })
    ).toEqual(CD);
  });

  test("CCCCC => D", function () {
    expect(
      proceedToReplacements({
        digit: "C",
        plus: {
          digit: "C",
          plus: {
            digit: "C",
            plus: {
              digit: "C",
              plus: {
                digit: "C",
              },
            },
          },
        },
      })
    ).toEqual(D);
  });

  test("DCD => CM", function () {
    expect(
      proceedToReplacements({
        digit: "D",
        plus: {
          digit: "C",
          plus: {
            digit: "D",
          },
        },
      })
    ).toEqual(CM);
  });

  test("DD => M", function () {
    expect(
      proceedToReplacements({
        digit: "D",
        plus: {
          digit: "D",
        },
      })
    ).toEqual(M);
  });
});

describe("equal", function () {
  test("I === I", function () {
    expect(equal(I, I)).toEqual(true);
  });

  test("I === V", function () {
    expect(equal(I, V)).toEqual(false);
  });

  test("II === I", function () {
    expect(equal(II, I)).toEqual(false);
  });

  test("II === II", function () {
    expect(equal(II, II)).toEqual(true);
  });

  test("IV !== V", function () {
    expect(equal(IV, V)).toEqual(false);
  });

  test("IV === IV", function () {
    expect(equal(IV, IV)).toEqual(true);
  });

  test("[control] VI === VII", function () {
    expect(equal(VI, VII)).toEqual(false);
  });
});

describe("toString", function () {
  test("I", function () {
    expect(toString(I)).toEqual("I");
  });

  test("II", function () {
    expect(toString(II)).toEqual("II");
  });

  test("IV", function () {
    expect(toString(IV)).toEqual("IV");
  });

  test("[control] XIV", function () {
    expect(toString(XIV)).toEqual("XIV");
  });
});

describe("toRomanNumeral", function () {
  test("I", function () {
    expect(toRomanNumeral("I")).toEqual(I);
  });

  test("VI", function () {
    expect(toRomanNumeral("VI")).toEqual(VI);
  });

  test("IV", function () {
    expect(toRomanNumeral("IV")).toEqual(IV);
  });

  test("[control] XIV", function () {
    expect(toRomanNumeral("XIV")).toEqual(XIV);
  });
});

describe("Assemble all parts", function () {
  test("CX + LXII = CLXXII", function () {
    expect(add("CX", "LXII")).toEqual("CLXXII");
  });

  test("[control] CXLVII + LXXIII = CCXX", function () {
    expect(add("CXLVII", "LXXIII")).toEqual("CCXX");
  });
});
