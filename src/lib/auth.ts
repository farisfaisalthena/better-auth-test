import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { username, emailOTP, openAPI, bearer, jwt } from 'better-auth/plugins';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql'
    }),
    plugins: [
        jwt(),
        bearer(),
        openAPI(),
        username(),
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                console.log('Email: ', email);
                console.log('OTP: ', otp);
                console.log('Type: ', type);
            },
            sendVerificationOnSignUp: true,
            expiresIn: 900
        })
    ],
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        apple: {
            enabled: true,
            clientId: process.env.APPLE_CLIENT_ID!,
            clientSecret: process.env.APPLE_CLIENT_SECRET!
        },
        discord: {
            enabled: true,
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!
        },
        google: {
            enabled: true,
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ['apple', 'discord', 'google']
        }
    }
})