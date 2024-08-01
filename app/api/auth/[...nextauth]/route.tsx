import NextAuth, { Session, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
import User from "@models/user";

type CustomProfile = Profile & {
  email: string;
  name: string;
  image: string;
  picture: string;
}

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
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      }
      return session;
    },
    async signIn({ profile }:any) {
      try {
        await connectDB();
        
        const user = await User.findOne({ email: profile?.email });

        if (!user && profile) {
          await User.create({
            email: profile.email,
            name: profile.name?.replace(" ", "").toLowerCase(),
            image: profile.picture || profile.image,
          });
        }

        return true;
      } catch (err: any) {
        if (err.name === "ValidationError") {
          console.error("Validation Error during sign-in:", err.errors);
          return false;
        }
        console.error("Error during sign-in:", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
