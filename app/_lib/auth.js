import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    // Use for authorization
    authorized({ auth, request }) {
      // If auth object is exist then user is allowed to access the resource
      return !!auth?.user;
    },

    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch {
        return false;
      }
    },

    async session({ session }) {
      const { user } = session || {};
      const existingGuest = await getGuest(user.email);
      session.user.guestId = existingGuest.id;
      return session;
    },
  },
  pages: {
    // Specify URLs to be used if you want to create custom sign in, sign out and error pages. Pages specified will override the corresponding built-in page.
    signIn: "/login",
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
