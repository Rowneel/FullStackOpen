import { test, describe } from "node:test";
import assert from "node:assert";
import listHelper from "../utils/list_helper.js";

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
});

describe("most likes", () => {
  const listWithManyBlogs = [
    {
      _id: "5a422aa71b54a676234d17h2",
      title: "Is Go To Statement Considered Harmful?",
      author: "Edsger W. Dijkstra The Asker",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra The Answerer",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 20,
      __v: 0,
    },
  ];

  test("in list of blogs returns that blog", () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs);
    assert.deepStrictEqual(result, listWithManyBlogs[1]);
  });
});

describe("author", () => {
  const listWithMultipleBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a412aa71b54a676234d17f8",
      title: "Go To Statement Considered Usefull?/",
      author: "HisBro W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 6,
      __v: 0,
    },
    {
      _id: "5a412aa51b54a676234d17f8",
      title: "Go To Statement Considered Usefull? I don't think so.",
      author: "HisBro W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 12,
      __v: 0,
    },
  ];

  const listWithTwoAuthorSameNumberOfBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a412aa71b54a676234d17f8",
      title: "Go To Statement Considered Usefull?/",
      author: "HisBro W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 6,
      __v: 0,
    },
  ];

  test("with most blogs", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    assert.deepStrictEqual(result, { author: "HisBro W. Dijkstra", blogs: 2 });
  });

  test("with most blogs, multiple authors with most blogs", () => {
    const result = listHelper.mostBlogs(listWithTwoAuthorSameNumberOfBlogs);
    assert.deepStrictEqual(result, [
      { author: "Edsger W. Dijkstra", blogs: 1 },
      { author: "HisBro W. Dijkstra", blogs: 1 },
    ]);
  });

  test("with most likes", () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    assert.deepStrictEqual(result, { author: "HisBro W. Dijkstra", likes: 18 });
  });
});
