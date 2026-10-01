export const USER_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!\$\. ])[A-Za-z\d@#!\$\. ]+$/;


export const USER_PASSWORD_MAXIMUM_LENGTH = 100;

export const NAME_REGEX = /^[a-zA-Z\-]$/;

// Makes at least one small letter and one capital letter mandatory.
export const ALTERNATE_NAME_REGEX = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\-]+$/;

export const USER_FIRST_NAME_MAXIMUM_LENGTH = 100;

export const USER_LAST_NAME_MAXIMUM_LENGTH = 100;

export const USER_EMAIL_MAXIMUM_LENGTH = 100;

export const USER_MOBILE_NO_MAXIMUM_LENGTH = 12;

export enum USER_STATUS {
    ACTIVE = 'active',
    SUSPENDED = 'suspended'
};

export enum USER_ROLE {
    COMPANY_EMPLOYEE = 'company_employee',
    COMPANY_MANAGER = 'company_manager',
    RESTAURANT_EMPLOYEE = 'restaurant_employee',
    RESTAURANT_MANAGER = 'restaurant_manager',
    CHAIN_MANAGER = 'chain_manager'
};
