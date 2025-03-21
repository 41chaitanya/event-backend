// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token){
//     return res.status(401).json({ message: "Access Denied" });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } 
//   catch (err) {

//     res.status(400).json({ message: "Invalid Token" });
//   }
// };

// export default authMiddleware;



import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // console.log("Received Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // console.log("No token provided or incorrect format");
    return res.status(401).json({ message: "Access Denied" });
  }

  const token = authHeader.split(" ")[1];     // Extract token after "Bearer"
  // console.log("Token Extracted:", token);

  try {
    // console.log("Using Secret:", process.env.JWT_SECRET);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Token Verified:", verified);

    req.user = verified;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(400).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;


