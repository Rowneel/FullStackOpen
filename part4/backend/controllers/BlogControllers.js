import express from "express";
import { Blog } from "../models/Blog.js";
const BlogRoutes = express.Router();

BlogRoutes.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

BlogRoutes.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

export default BlogRoutes;
