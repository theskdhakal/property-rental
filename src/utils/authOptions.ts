import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
import { NextAuthOptions, Profile } from "next-auth";

interface ProfileProps {
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

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
    //Invoked on successful signin

    async signIn({ profile }: { profile?: ProfileProps }) {
      // Connect to database

      await connectDB();
      console.log("this is user profile", profile);

      //check if profile is defined
      if (!profile) {
        console.log("no profile found");
        return false;
      }

      // Check if user exists
      const userExists = await User.findOne({ email: profile.email });

      // If user does not exist, create user
      if (!userExists) {
        const username = profile.name?.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      // Return true to allow signin
      return true;
    },
    //Modifies the session object
    async session({ session }: { session: any }) {
      // 1. get user from db

      const user = await User.findOne({ email: session.user.email }).maxTimeMS(
        20000
      );
      // 2. Assign the user id to session
      session.user.id = user._id.toString();

      session.user.id;
      // 3. return session
      return session;
    },
  },
};
