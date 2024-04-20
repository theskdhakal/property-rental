import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

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

    async signIn({ profile }: { profile: any }) {
      try {
        // Connect to database

        await connectDB();

        // Check if user exists
        const userExists = await User.findOne({ email: profile.email });

        // If user does not exist, create user
        if (!userExists) {
          const username = profile.name.slice(0, 20);
          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }

        // Return true to allow signin
        return true;
      } catch (error) {
        console.error("Error registering user:", error);
        return false;
      }
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
