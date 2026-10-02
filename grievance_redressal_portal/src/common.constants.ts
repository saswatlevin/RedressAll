// File that contains field constants.
export const ADDRESS_ROOM_NUMBER_REGEX = /^[0-9]*$/;
export const ADDRESS_ROOM_NUMBER_MAXIMUM_LENGTH = 5;
export const ADDRESS_ROOM_NUMBER_REGEX_MESSAGE = "This field must contain only digits [0 to 9].";

export const ADDRESS_BUILDING_REGEX = /^(?=(?:[^A-Za-z]*[A-Za-z]){4})[A-Za-z0-9\-.' ]*$/;
export const ADDRESS_BUILDING_MAXIMUM_LENGTH = 50;
export const ADDRESS_BUILDING_REGEX_MESSAGE = "This field must contain at least 4 letters (A to Z or a to z). Can also contain digits (0 to 9), hyphens(-), periods (.) single-quotes(') and spaces.";

export const ADDRESS_STREET_REGEX = /^(?=(?:[^A-Za-z]*[A-Za-z]){4})[A-Za-z0-9\-.' ]*$/;
export const ADDRESS_STREET_MAXIMUM_LENGTH = 100;
export const ADDRESS_STREET_REGEX_MESSAGE = "This field must contain at least 4 letters (A to Z or a to z). Can also contain digits (0 to 9), hyphens(-), periods (.) single-quotes(') and spaces.";

export const ADDRESS_CITY_REGEX = /^(?=(?:[^A-Za-z]*[A-Za-z]){4})[A-Za-z\-.' ]*$/;
export const ADDRESS_CITY_MAXIMUM_LENGTH = 100;
export const ADDRESS_CITY_REGEX_MESSAGE = "This field must contain at least 4 letters and may contain only Capital letters (A to Z), small letters (a to z), hyphens (-), Periods (.), apostrophes ('), and spaces.";
/**
 * Must contain at least 4 letters and may contain only letters (A–Z, a–z, À–Ö, Ø–ö, ø–ÿ), digits (0–9), #, !, ,, ;, :, %, apostrophes (' ’), quotation marks (“ ”, "), backslash (), parentheses (( )), hyphens (-), em dash (—), periods (.), underscores (_), And spaces.
 */

export const ADDRESS_ADMIN_DIVISION_REGEX = /^(?=(?:[^A-Za-z]*[A-Za-z]){4})[A-Za-z\-.' ]*$/;
export const ADDRESS_ADMIN_DIVISION_MAXIMUM_LENGTH = 100;
export const ADDRESS_ADMIN_DIVISION_REGEX_MESSAGE = "This field must contain at least 4 letters and may contain only Capital letters (A to Z), small letters (a to z), hyphens (-), Periods (.), apostrophes ('), and spaces.";

export const ADDRESS_COUNTRY_REGEX = /^(?=(?:[^A-Za-z]*[A-Za-z]){4})[A-Za-z\- ]*$/;
export const ADDRESS_COUNTRY_MAXIMUM_LENGTH = 100;
export const ADDRESS_COUNTRY_REGEX_MESSAGE = "Must contain at least 4 letters and may contain only Capital letters (A to Z), small letters (a to z), hyphens (-) and spaces.";

export const ADDRESS_POST_CODE_REGEX = /^[A-Z0-9\- ]*$/;
export const ADDRESS_POST_CODE_MAXIMUM_LENGTH = 12;

export const PARAGRAPH_REGEX = /^(?=(?:[^A-Za-zÀ-ÖØ-öø-ÿ]*[A-Za-zÀ-ÖØ-öø-ÿ]){4})[A-Za-zÀ-ÖØ-öø-ÿ0-9#!,;:%'’“”\\"()\-—._ ]*$/;
export const PARAGRAPH_REGEX_MESSAGE = "Must contain at least 4 letters and may contain only letters (A to Z, a to z, À to Ö, Ø to ö, ø to ÿ), digits (0 to 9), #, !, ,, ;, :, %, apostrophes ('), quotation marks (“ ”), backslash (), parentheses (( )), hyphens (-), em dash (—), periods (.), underscores (_), And spaces.";