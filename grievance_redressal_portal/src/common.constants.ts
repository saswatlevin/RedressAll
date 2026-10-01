export const ADDRESS_ROOM_NUMBER_REGEX = /^[0-9]*$/;
export const ADDRESS_ROOM_NUMBER_MAXIMUM_LENGTH = 5;

export const ADDRESS_BUILDING_REGEX = /^[A-Za-z0-9\-.' ]*$/;
export const ADDRESS_BUILDING_MAXIMUM_LENGTH = 50;

export const ADDRESS_STREET_REGEX = /^[A-Za-z0-9\-.' ]*$/;
export const ADDRESS_STREET_MAXIMUM_LENGTH = 100;

export const ADDRESS_CITY_REGEX = /^[A-Za-z\-.' ]*$/;
export const ADDRESS_CITY_MAXIMUM_LENGTH = 100;

export const ADDRESS_ADMIN_DIVISION_REGEX = /^[A-Za-z\-.' ]*$/;
export const ADDRESS_ADMIN_DIVISION_MAXIMUM_LENGTH = 100;

export const ADDRESS_COUNTRY_REGEX = /^[A-Za-z\- ]*$/;
export const ADDRESS_COUNTRY_MAXIMUM_LENGTH = 100;

export const ADDRESS_POST_CODE_REGEX = /^[A-Z0-9\- ]*$/;
export const ADDRESS_POST_CODE_MAXIMUM_LENGTH = 12;

export const PARAGRAPH_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9#!,;:%'’“”\\\"\(\)\-\—\.\_ ]*$/;
export const COMMENT_CONTENT_MAXIMUM_LENGTH = 2000;