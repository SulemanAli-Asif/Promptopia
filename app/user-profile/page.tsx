"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const searchParam = useSearchParams();
  const id = searchParam.get("id");

  const { data: session } = useSession();
  const [desc, setDesc] = useState("Welcome to your profile!");
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (posts.length > 0) {
      const firstPost: any = posts[0];
      const isOwnProfile = session?.user.id;

      if (isOwnProfile === id) {
        setDesc(`Welcome to your profile, ${session?.user.name}!`);
        setName(session?.user.name || "");
      } else {
        setDesc(`Welcome to ${firstPost?.creator?.name}'s profile!`);
        setName(firstPost?.creator?.name || "");
      }
    }
  }, [posts, session?.user.id, id]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, [session?.user.id]);
  return <Profile name={name} desc={desc} data={posts} />;
};

export default MyProfile;
