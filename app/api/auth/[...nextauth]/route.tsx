import NextAuth, { Session, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
import User from "@models/user";

console.log({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session }: { session: Session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }: { profile?: Profile }) {
      try {
        // Connect to the database
        await connectDB();
        // if the user already exists:

        const user = await User.findOne({
          email: profile?.email,
        });

        if (!user) {
          await User.create({
            email: profile?.email,
            name: profile?.name.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }

        //if the user doesn't exist
        return true;
      } catch (err) {
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
