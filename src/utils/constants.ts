export const CATEGORY_MULTIPLIER: Record<number, number> = {
  1: 1.1, // 자음은 1.1배
  2: 1.2, // 모음은 1.2배
  3: 1.4,
};

export const WORD_TYPE: Record<number, string> = {
  1: "자음",
  2: "모음",
  3: "단어&문장",
};

export const SIGN_WORD: Record<string, string> = {
  INIT_VALUE: "ㅊ",
};
