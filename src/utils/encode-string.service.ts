/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';

const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const ENCRYPTION_KEY = '12345678901234567890123456789012';
const IV_LENGTH = 16;

@Injectable()
export class EncodeStringService {
    static encode(text: string) {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
        let encode = cipher.update(text);

        encode = Buffer.concat([encode, cipher.final()]);

        return `${iv.toString('hex')}:${encode.toString('hex')}`;
    }
    static decode(text: string) {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
};
