import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { DefaultSession } from "next-auth";

export interface ExtendedSessionUser extends DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
  };
}

export const getSessionUser = async () => {
  try {
    const session: ExtendedSessionUser | null = await getServerSession(
      authOptions
    );

    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
