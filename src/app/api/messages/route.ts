import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//GET /api/messges
export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(JSON.stringify("User ID is required"), {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const readMessages = await Message.find({ receipent: userId, read: true })
      .sort({ creatAt: -1 }) //sort read messages in ascen order
      .populate("sender", "username")
      .populate("property", "name");

    const unreadMessages = await Message.find({
      receipent: userId,
      read: false,
    })
      .sort({ creatAt: -1 }) //sort read messages in ascen order
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 200,
    });
  }
};

//POST /api/message

export const POST = async (request: any) => {
  try {
    await connectDB();

    const { name, email, message, phone, property, receipent } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ message: "You must log in to send message" }),
        { status: 401 }
      );
    }

    const { user } = sessionUser;

    //cannot send messgae to shelf
    if (user.id === receipent) {
      return new Response(
        JSON.stringify({ message: "Cannot send message to yourself" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      receipent,
      email,
      property,
      name,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: "Message sent" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 200,
    });
  }
};
