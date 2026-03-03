import React, { createContext, ReactNode, useContext, useState } from "react";
import { ADMIN_POSTS_MOCK_DATA } from "../admin-posts.data";

export interface Post {
  id: string;
  title: string;
  company: string;
  category:
    | "project"
    | "recruitment"
    | "news"
    | "achievement"
    | "product"
    | "workshop"
    | "document";
  status: "pending" | "approved" | "rejected" | "edited";
  createdDate: string;
  content: string;
  lastEdited?: string;
  editCount?: number;
  detailedContent?: string;
  // Project specific
  field?: string;
  cooperationType?: string;
  budget?: string;
  // Recruitment specific
  position?: string;
  industry?: string;
  level?: string;
  salary?: string;
  location?: string;
  deadline?: string;
  workType?: string;
  description?: string;
  requirements?: string;
  benefits?: string;
}

interface PostsContextType {
  posts: Post[];
  updatePostStatus: (postId: string, status: Post["status"]) => void;
  getPostById: (postId: string) => Post | undefined;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>(ADMIN_POSTS_MOCK_DATA);

  const updatePostStatus = (postId: string, status: Post["status"]) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, status } : post,
      ),
    );
  };

  const getPostById = (postId: string) => {
    return posts.find((post) => post.id === postId);
  };

  return (
    <PostsContext.Provider value={{ posts, updatePostStatus, getPostById }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};
