import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import conn from '@/utils/db';
import User from '@/models/Users';
import Employer from '@/models/Employer';
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        CredentialsProvider({
            id: "credentials",
            name: "Credentials",

            async authorize(credentials) {
                try {
                    await conn();
                    const user = await User.findOne({ email: credentials.email });

                    if (user) {
                        const verifyPassword = await bcrypt.compare(credentials.password, user.password);

                        if (verifyPassword) {
                            return user;
                        } else {
                            throw new Error('Wrong Credentials');
                        }
                    } else {
                        throw new Error('User not found');
                    }
                } catch (error) {
                    throw new Error('Wrong Credentials');
                }
            },
        }),

        CredentialsProvider({
            id: "employer-credentials",
            name: "Employer-Credentials",

            async authorize(credentials) {
                try {
                    await conn();
                    const employer = await Employer.findOne({ email: credentials.email });

                    if (employer) {
                        const verifyPassword = await bcrypt.compare(credentials.password, employer.password);

                        if (verifyPassword) {
                            return employer;
                        } else {
                            throw new Error('Wrong Credentials');
                        }
                    } else {
                        throw new Error('User not found');
                    }
                } catch (error) {
                    throw new Error(`Authentication failed ${error}`);
                }
            },
        }),
    ],

    session: {
        maxAge: 60 * 60 * 5,
        strategy: 'jwt',
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };