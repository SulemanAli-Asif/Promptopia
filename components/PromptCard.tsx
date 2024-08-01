"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: any) => {
  const { data: session } = useSession();


  const [copy, setcopy] = useState("");

  const handleCopy = () => {
    setcopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => {
      setcopy("");
    }, 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {post?.creator?.image && (
            <Image
              src={post?.creator?.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          )}
        <Link href = "/user-profile">
        <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.name && post.creator.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.email && post.creator.email}
            </p>
          </div>
          </Link>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copy === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.id)}
      >
        {post.tag}
      </p>
      {session?.user.id === post?.creator?._id && (
        <div className=" mt-4 flex-center gap-4 border-t border-gray-100 pt-3 items-center ">
          <button
            className="btn font-inter text-sm  text-white green_gradient cursor-pointer"
            onClick={()=>handleEdit(post)}
          >
            Edit
          </button>

          <button
            className="btn font-inter text-sm  text-white orange_gradient cursor-pointer"
            onClick={()=>handleDelete(post)}
          >
            Delete
          </button>
          
        </div>
      )}
    </div>

  );
};

export default PromptCard;
