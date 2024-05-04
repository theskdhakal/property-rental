import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request: any) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    //find user in db
    const user = await User.findOne({ _id: userId });

    //check if peoperty is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      //if already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      // if not bookmarked
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};
