import { ReactNode } from "react";

export interface User {
  displayName?: string;
  token: string;
}
export interface AuthContextType {
  user: User | null; // User can be null when not logged in
  isAuthenticated: boolean;
  testHandleLogin: (username: string, password: string) => void;
  testHandleLogout: (user: User) => void;

  loading: boolean;
  authError: string | null;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface BlogsContextType {
  blogs: BlogInterface[];
  query: string;
  updateQuery: (newQuery: string) => void;
  //filteredBlogs: BlogInterface[];
  blogsLoading: boolean;
  setBlogs: (newBlogs: BlogInterface[]) => void;
  //searchBlogs: (query: string) => void;
}

export interface BlogsProviderProps {
  children: ReactNode;
}

export interface BlogInterface {
  title: string;
  content: string;
  id: string;
}

export interface BlogRenderProps {
  blog: BlogInterface;
  isInitialRender: boolean;
  onEdit: (blog: BlogInterface) => void;
  onDelete: (blogId: string) => void;
  index: number;
}

export interface ModalProps {
  message: string;
  onClose: () => void;
}

export interface ApiLoginFormData {
  username: string;
  password: string;
}

export interface protectionLoginFormData {
  username: string;
  password: string;
  name: string;
}

export interface ApiRegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  username: string;
  password: string;
}
export interface RegisterFormErrors extends FormErrors {
  confirmPassword: string;
  email: string;
}

export interface LoginFormErrors extends FormErrors {
  credentials: string;
}

export interface protectionLoginFormErrors extends LoginFormErrors {
  name: string;
}

export interface FormErrorProps {
  message: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface protectedLoginFormProps {
  formData: protectionLoginFormData;
  formErrors: protectionLoginFormErrors;
  handleFormData: (key: keyof protectionLoginFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isProcessing: boolean;
}
