export const censoredHeaders = [
    'authorization',
    '!~passenger-envvars',
    '!~passenger-client-address',
    'postman-token',
    'Ocp-Apim-Subscription-key',
    'cookie',
    'token'
];

export const censoredFields = [
    'message',
    'subject',
    'body',
    'extra',
    'first_name',
    'last_name',
    'email',
    'address1',
    'address2',
    'phone',
    'mobile',
    'state',
    'country',
    'zip_code',
    'city',
    'birthday',
    'firstName',
    'lastName',
    'email',
    'address1',
    'address2',
    'phone',
    'mobile',
    'state',
    'country',
    'zipCode',
    'city',
    'birthday',
    'client_token',
    'name',
];

export const censored = [...censoredHeaders, ...censoredFields];
