import _ from "lodash";

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((s, b) => s + b.likes, 0);
};

const favouriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((b) => b.likes));
  return blogs.find((b) => b.likes === mostLikes);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const grouped = _.groupBy(blogs, "author");
  console.log("Logging grouped", JSON.stringify(grouped, null, 2));

  const authorCounts = _.map(grouped, (authorBlogs, author) => ({
    author,
    blogs: authorBlogs.length,
  }));

  const maxBlogs = _.max(authorCounts.map((a) => a.blogs));

  const topAuthors = authorCounts.filter((a) => a.blogs === maxBlogs);

  return topAuthors.length === 1 ? topAuthors[0] : topAuthors;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const grouped = _.groupBy(blogs, "author");
  console.log("Logging grouped", JSON.stringify(grouped, null, 2));

  const likesCounts = _.map(grouped, (authorBlogs, author) => ({
    author,
    likes: authorBlogs.reduce((sum, authorBlog) => {
      return sum + authorBlog.likes;
    }, 0),
  }));

  const maxLikes = _.max(likesCounts.map((likesCount) => likesCount.likes));
  const topAuthors = likesCounts.filter((likesCount) => {
    return likesCount.likes === maxLikes;
  });
  return topAuthors.length === 1 ? topAuthors[0] : topAuthors;
};

export default { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
