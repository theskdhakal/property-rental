import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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

    async signin({ profile }) {
      // 1. connect to db
      //2 . check if user exists
      // 3. if not, then add user to db
      //4 . return true to allow signin
    },
    //Modifies the session object
    async session({ session }) {
      // 1. get user from db
      // 2. Assign the user id to session
      // 3. return session
    },
  },
};
