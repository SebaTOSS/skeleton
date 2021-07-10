export default {
    DEFAULT_ORDER: 'id,asc',
    TRANSLATION_KEYS: {
        id: 'id',
        name: 'name',
    },
    PERMISSIONS: {
        CREATE: 'USERS_CREATE',
        READ: 'USERS_READ',
        UPDATE: 'USERS_UPDATE',
        DELETE: 'PUBLIC',
        USERS_SEND_INVITATION_LINK: 'USERS_SEND_INVITATION_LINK'
    },
    CLIENT_TYPE : {
        OWNERS: 'Owner',
        PARTNERS: 'Partner'
    }
};
