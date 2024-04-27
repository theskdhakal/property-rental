import connectDB from "@/config/database";
import Property from "@/models/Property";

interface ParamType {
  userId: string;
}
//GET /api/properties/user/:userId
export const GET = async (request: any, { params }: { params: ParamType }) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response("User Id is required", { status: 400 });
    }

    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went Wrong", {
      status: 500,
    });
  }
};
