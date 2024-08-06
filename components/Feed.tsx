"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import PromptCard from "./PromptCard";

const PromptCardList = ({
  data,
  handleTagClick,
  handleDelete,
  handleEdit,
}: any) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: any) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const newPosts = posts.filter((p: any) => p._id !== post._id);
        setPosts(newPosts);
      } catch (err) {
        return;
      }
    }
  };

  const handleEdit = (post: any) => {
    router.push(`update-prompt?id=${post.id}`);
  };

  useEffect(() => {
    // fetch prompts
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e: any) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  };

  const filteredData = useMemo(() => {
    if (!searchText) {
      setFiltered(posts);
      return;
    }
    const filtered = posts.filter(
      (post: any) =>
        post?.tag?.toLowerCase().includes(searchText.toLowerCase()) ||
        post?.creator?.name?.toLowerCase().includes(searchText.toLowerCase())
    );

    setFiltered(filtered);
  }, [searchText, posts]);

  return (
    <section className="feed">
      <form className=" relative w-full flex-center ">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filtered}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default Feed;
