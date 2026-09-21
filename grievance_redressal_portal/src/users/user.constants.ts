export const USER_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!\$\. ])[A-Za-z\d@#!\$\. ]+$/;

export const USER_PASSWORD_MAXIMUM_LENGTH = 100;

export const NAME_REGEX = /^[a-zA-Z\-]$/;

export const USER_FIRST_NAME_MAXIMUM_LENGTH = 100;

export const USER_LAST_NAME_MAXIMUM_LENGTH = 100;

export const USER_EMAIL_MAXIMUM_LENGTH = 100;

export const USER_ROLE_REGEX = /^[a-z\_]$/;

export const USER_ROLE_MAXIMUM_LENGTH = 50;

export const USER_MOBILE_NO_REGEX = /^[0-9]$/;

export const USER_MOBILE_NO_MAXIMUM_LENGTH = 12;

export enum USER_STATUS {
    ACTIVE = 'active',
    SUSPENDED = 'suspended'
};
