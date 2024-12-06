import { useCallback, useState } from "react";
import { BlogInterface, User } from "../types";
import { baseURL } from "../utils/config";

type UpdateBlog = Partial<BlogInterface>;
type CreateBlog = {
  title: string;
  content: string;
};

type LoginRequest = {
  username: string;
  password: string;
};
type PayloadType = UpdateBlog | CreateBlog | LoginRequest;

const useRequest2 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const testMakeRequest = useCallback(
    async (
      type: RequestType,
      user?: User,
      payload?: PayloadType | null,
      postId?: string,
      signal?: AbortSignal
    ) => {
      setLoading(true);
      setError(null);

      let url = baseURL;
      let options: RequestInit = {};

      switch (type) {
        case "login":
          if (!payload) throw new Error("Payload required for login.");
          url = `${baseURL}/login`;
          options = {
            method: "POST",
            headers: BuildHeaders(),
            body: JSON.stringify(payload),
          };
          break;
        case "logout":
          if (!user) throw new Error("User object is required for logout");
          url = `${baseURL}/logout`;
          options = {
            method: "POST",
            headers: BuildHeaders(user),
          };
          break;
        case "create":
          if (!user) throw new Error("User object is required for create.");
          if (!payload) throw new Error("Payload required for create.");
          url = `${baseURL}/posts`;
          options = {
            method: "POST",
            headers: BuildHeaders(user),
            body: JSON.stringify(payload),
          };
          break;

        case "delete":
          if (!user) throw new Error("User object is required for delete.");
          if (!postId) throw new Error("postId required for update.");
          url = `${baseURL}/posts/${postId}`;
          options = {
            method: "DELETE",
            headers: BuildHeaders(user),
          };
          break;

        case "update":
          if (!user) throw new Error("User object is required for update.");
          if (!payload) throw new Error("Payload required for update.");
          if (!postId) throw new Error("postId required for update.");
          url = `${baseURL}/posts/${postId}`;
          options = {
            method: "PUT",
            headers: BuildHeaders(user),
            body: JSON.stringify(payload),
            signal,
          };
          break;

        case "getAll":
          url = `${baseURL}/posts`;
          options = {
            method: "GET",
          };
          break;

        case "getOne":
          if (!postId)
            throw new Error("blogId required for fetching single post.");
          url = `${baseURL}/posts/${postId}`;
          options = {
            method: "GET",
          };
          break;

        default:
          setError("Invalid request type.");
          return;
      }

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (type === "delete") {
          console.log(`Blog with ID ${postId} deleted successfully.`);
          return;
        }
        const result = await response.json();

        return result;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          setError("Update aborted.");
          return;
        }
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const testFetchBlogs = useCallback(() => {
    return testMakeRequest("getAll");
  }, [testMakeRequest]);

  const testFetchBlogById = useCallback(
    (id: string) => {
      return testMakeRequest("getOne", undefined, null, id);
    },
    [testMakeRequest]
  );

  const testUpdateBlog = useCallback(
    (
      user: User,
      id: string,
      updatedBlog: Partial<BlogInterface>,
      signal: AbortSignal
    ) => {
      //console.log("Use abort signal: ", signal);
      return testMakeRequest("update", user, updatedBlog, id, signal);
    },
    [testMakeRequest]
  );
  const testDeleteBlog = useCallback(
    (user: User, id: string) => {
      return testMakeRequest("delete", user, null, id);
    },
    [testMakeRequest]
  );
  const testCreateBlog = useCallback(
    (user: User, blog: Partial<BlogInterface>) => {
      return testMakeRequest("create", user, blog);
    },
    [testMakeRequest]
  );

  const testLogin = useCallback(
    (username: string, password: string) => {
      return testMakeRequest("login", undefined, { username, password });
    },
    [testMakeRequest]
  );

  const testLogout = useCallback(
    (user: User) => {
      return testMakeRequest("logout", user);
    },
    [testMakeRequest]
  );

  return {
    loading,
    error,
    testLogin,
    testLogout,
    testFetchBlogs,
    testFetchBlogById,
    testCreateBlog,
    testUpdateBlog,
    testDeleteBlog,
  };
};

export default useRequest2;

type RequestType =
  | "login"
  | "logout"
  | "update"
  | "delete"
  | "create"
  | "getAll"
  | "getOne";

const BuildHeaders = (user?: User): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (user?.token) {
    headers["Authorization"] = `Bearer ${user.token}`;
  }

  return headers;
};
