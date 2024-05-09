import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//PUT /api/message/:ID
export const PUT = async (request: any, { params }: { params: any }) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify("User ID is required"), {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    const message = await Message.findById(id);

    if (!message) return new Response("Message Not Found", { status: 404 });

    //verify ownership
    if (message.receipent.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    //updated message to read/unread depending upon the current status
    message.read = !message.read;

    await message.save();
    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

//DELETE /api/message/:ID
export const DELETE = async (request: any, { params }: { params: any }) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify("User ID is required"), {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    const message = await Message.findById(id);

    if (!message) return new Response("Message Not Found", { status: 404 });

    //verify ownership
    if (message.receipent.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await message.deleteOne();

    return new Response("Message deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
