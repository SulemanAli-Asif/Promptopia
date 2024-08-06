import NextAuth, { Session, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session }: { session: Session }) {
      if (session?.user?.email) {
        const sessionUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
        if (sessionUser) {
          session.user.id = sessionUser.id.toString();
        }
      }
      return session;
    },
    async signIn({ profile }: any) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!user && profile) {
          await prisma.user.create({
            data: {
              email: profile.email!,
              name: profile.name?.replace(" ", "").toLowerCase(),
              image:
                profile.picture ||
                profile.image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              password: null,
            },
          });
        }

        return true;
      } catch (err: any) {
        console.error("Error during sign-in:", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
