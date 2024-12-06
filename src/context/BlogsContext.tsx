import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { BlogsContextType, BlogsProviderProps, BlogInterface } from "../types";
import useRequest2 from "../hooks/useRequest2";

const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

export const useBlogs = () => {
  const context = useContext(BlogsContext);
  if (!context) {
    throw new Error("useAuth must be used within a BlogsProvider");
  }
  return context;
};

export const BlogsProvider: React.FC<BlogsProviderProps> = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [query, setQuery] = useState<string>("");
  //const [filteredBlogs, setFilteredBlogs] = useState<BlogInterface[]>([]);
  const { testFetchBlogs, loading } = useRequest2();

  const updateQuery = useCallback((newQuery: string) => {
    //if (newQuery === "") return;
    setQuery(newQuery);
  }, []);

  useEffect(() => {
    const initBlogs = async () => {
      try {
        const data = await testFetchBlogs();
        setBlogs(data); //triggers re-render for BlogsProvider (normal)
        //setFilteredBlogs(data); //may cause re-render
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    };
    initBlogs();
  }, []);

  useEffect(() => {
    setBlogsLoading(loading);
  }, [loading]);

  // const searchBlogs = useCallback(
  //   (query: string) => {
  //     if (!query.trim()) {
  //       //setFilteredBlogs(blogs); //To be resolved
  //       return;
  //     }

  //     const filtered = blogs.filter(
  //       (blog) =>
  //         blog.title.toLowerCase().includes(query.toLowerCase()) ||
  //         blog.content.toLowerCase().includes(query.toLowerCase())
  //     );
  //     console.log("original filtered:", filtered);
  //     //setFilteredBlogs(filtered);
  //   },
  //   [blogs]
  // );
  // const searchBlogs = () => {};
  // const filteredBlogs: any = [];

  return (
    <BlogsContext.Provider
      value={{
        query,
        updateQuery,
        blogs,
        setBlogs,
        blogsLoading,
        //      searchBlogs,
        //filteredBlogs,
      }}
    >
      {children}
    </BlogsContext.Provider>
  );
};
