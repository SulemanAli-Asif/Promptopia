"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPage = () => {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const { data: session } = useSession();
  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const promptId = SearchParams.get("id");
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);

      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const createPost = async (e: any) => {
    e.preventDefault();
    setSubmit(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };


  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submit={submit}
      handleSubmit={createPost}
      // handleDelete = {handleDelete}
    />
  );
};

export default EditPage;
