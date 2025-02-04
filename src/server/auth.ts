import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import prisma from "./db";

const validateCredentials = async (
  credentials?: Record<"email" | "password", string>
) => {
  if (!credentials?.email || !credentials.password) {
    throw new Error("Email and password are required");
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });

  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    throw new Error("Invalid email or password");
  }

  return user;
};

const formatUser = (user: User) => ({
  id: String(user.id),
  email: user.email,
  name: `${user.firstName} ${user.lastName}`,
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await validateCredentials(credentials);

        return formatUser(user);
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
