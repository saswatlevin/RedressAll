// File that contains field constants.
export const CHAIN_NAME_REGEX = /^(?=(?:[^A-Za-z]*[A-Za-z]){4})[A-Za-z0-9\-.#' ]*$/;
export const CHAIN_NAME_REGEX_MESSGAE = "This is the chain_name field. This field must contain at least 4 letters and may contain only capital letters (A to Z), small letters (a to z), digits (0 to 9), hyphens (-), periods (.), hash symbols (#), apostrophes ('), and spaces";
export const CHAIN_NAME_MAXIMUM_LENGTH = 100; 