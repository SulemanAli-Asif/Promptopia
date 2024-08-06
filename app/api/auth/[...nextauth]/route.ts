import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials
      ): Promise<{
        id: string;
        email: string;
        name: string;
        image: string;
      } | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password) {
          const isPasswordValid =
            (await bcrypt.compare(credentials.password, user?.password)) ||
            false;

          if (isPasswordValid) {
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
              image: user.image,
            };
          }
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (account?.provider === "google") {
        let dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              image: profile.picture,
            },
          });
        }

        token.id = dbUser.id;
      } else if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
    async signIn({ profile, credentials }: any): Promise<boolean> {
      try {
        let user;
        if (profile) {
          user = await prisma.user.findUnique({
            where: { email: profile.email },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: profile.email!,
                name: profile.name?.replace(" ", "").toLowerCase(),
                image:
                  profile.picture ||
                  profile.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              },
            });
          }
        } else if (credentials) {
          user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (
            user &&
            credentials?.password &&
            user?.password &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            return true;
          }
          return false;
        }

        if (user) {
          return true;
        }

        return false;
      } catch (err) {
        console.error("Error during sign-in:", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
