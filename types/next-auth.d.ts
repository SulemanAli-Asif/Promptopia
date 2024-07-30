import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
    }

    interface Profile {
        user: {
          name?: string | null;
          email?: string | null;
          picture?: string | null;
        };
      }
  }
  