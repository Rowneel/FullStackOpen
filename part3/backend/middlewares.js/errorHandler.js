export const errorHandler = (error, req, res, next) => {
  console.log("Logging error", error);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ error: errors.join(", ") });
  }
  next(error);
};
