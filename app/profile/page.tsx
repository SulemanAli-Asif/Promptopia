"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const[desc, setDesc] = useState("Welcome to your profile!");
  const [posts, setPosts] = useState([]);

  const handleEdit = (post: any) => {
    router.push(`update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: any) => {
    console.log("post ID: ", post._id);
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    console.log(hasConfirmed);
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const newPosts = posts.filter((p: any) => p._id !== post._id);
        console.log("newPosts: ", newPosts);
        setPosts(newPosts);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  };

  useEffect(()=>{
    posts.map((post: any) => {
      if(session?.user.name !== post?.creator?.name){
        setDesc(`Welcome to ${session?.user.name}'s profile!`);
      }
      else{
        
        setDesc(`Welcome to your profile, ${session?.user.name}!`);
  
      }
    });
  },[])

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user.id) {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
    };

    fetchPosts();
  }, [session?.user.id]); // Added session?.user.id to the dependency array
  return (
    <Profile
      name={session?.user.name}
      desc={desc}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
