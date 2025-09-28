import morgan from "morgan";
morgan.token("body", (req) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    return JSON.stringify(req.body);
  }
  return "";
});

export const tinyWithBody =
  ":method :url :status :res[content-length] - :response-time ms :body";
