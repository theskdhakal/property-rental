import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

interface ParamType {
  id: string;
}

//GET /api/properties/:id
export const GET = async (request: any, { params }: { params: ParamType }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) return new Response("Property not found", { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went Wrong", {
      status: 500,
    });
  }
};

//delete /api/properties/:id
export const DELETE = async (
  request: any,
  { params }: { params: ParamType }
) => {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    //check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) return new Response("Property not found", { status: 404 });

    //verify OwnserShip
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response("Property Deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went Wrong", {
      status: 500,
    });
  }
};
