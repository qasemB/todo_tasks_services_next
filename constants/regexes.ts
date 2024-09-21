export const regexes_patterns = {
    // ALL_ALPHABET : /^[\p{L}\p{N}\p{Pc}\p{M}\p{Zs}!@#.,;\/:\-،%؟?^$]*$/u,
    ALL_ALPHABET : /^[a-zA-Z0-9\s@.#!"$%^&*()+=\-[\]{}|\\:/?.,_\u0600-\u06FF\u200C]*$/,
    // ENGLISH_ALPHABET_NUM_CHARACTER :  /^[\p{N}\p{Pc}\p{M}\p{Zs}!@#.,;\/:\-،%؟?^$]*$/u,
    // ENGLISH_ALPHABET_NUM_CHARACTER :  /^[a-zA-Z0-9\s\p{L}]+$/u,
    ENGLISH_ALPHABET_NUM_CHARACTER :   /^[a-zA-Z0-9\s@.#!"$%^&*()+=\-[\]{}|\\:/?.,_\u200C]+$/,
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    SEMANTIC_V : /^\d+\.\d+\.\d+$/,
    URL: /^(https?:\/\/)?(((\w+-)+[a-zA-Z]{2,})|localhost)(:\d+)?(\/[\w\-.~]*)*(\?[\w\-.~=&]*)?(#[\w\-.~=&]*)?$/
    // LINK: /^[a-z]\/\/dev\.to\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+
}