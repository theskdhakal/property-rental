import connectDB from "@/config/database";
import Property from "@/models/Property";

//GET /api/properties
export const GET = async (request: any) => {
  try {
    await connectDB();

    const properties = await Property.find({});
    console.log(properties);

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
