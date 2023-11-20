import 'dotenv/config';

export default ({ config }) => {
    return {
        ...config,
        extra: {
            apiKey: process.env.apiKey,
            authDomain: process.env.authDomain,
            projectId: process.env.projectId,
            storageBucket: process.env.storageBucket,
            messagingSenderId: process.env.messagingSenderId,
            appId: process.env.appId,
        },
    };
};