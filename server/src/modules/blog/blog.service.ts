import Blog from "../../models/blog";
import { NotFoundError } from "../../utils/errors/app.error";

interface CreateBlogPayload {
  title: string;
  quote?: string;
  content: string;
  authorName?: string;
  authorTitle?: string;
  authorImage?: string;
  isPublished?: boolean;
}

export const createBlogService = async (payload: CreateBlogPayload) => {
  const blog = await Blog.create(payload);
  return blog;
};

export const getAllBlogsService = async () => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return blogs;
};

export const getSingleBlogService = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new NotFoundError("Blog not found");
  }
  return blog;
};

interface UpdateBlogPayload {
  title?: string;
  quote?: string;
  content?: string;
  authorName?: string;
  authorTitle?: string;
  authorImage?: string;
  isPublished?: boolean;
}

export const updateBlogService = async (id: string, payload: UpdateBlogPayload) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new NotFoundError("Blog not found");
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedBlog;
};

export const deleteBlogService = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new NotFoundError("Blog not found");
  }

  await Blog.findByIdAndDelete(id);
  return true;
};
