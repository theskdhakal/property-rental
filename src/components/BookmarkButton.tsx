"use client";
import { Property } from "@/app/properties/page";
import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { thisSession } from "@/app/profile/page";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }: { property: Property }) => {
  const { data } = useSession();

  const session: thisSession | undefined = data as thisSession;

  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark the property");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      console.log(res);

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went error");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className=" mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
