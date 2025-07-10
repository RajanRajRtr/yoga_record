import jwt from "jsonwebtoken";

// export const isLoggedIn = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: "Access denied. No token provided." });
//   }

//   try {
//     console.log("ln11");
//     const verified = jwt.verify(token, process.env.SECRET);
//     console.log("verified", verified);
//     // req.user = verified;
//     console.log("ln14");
//     next();
//   } catch (err) {
//     res.status(400).json({ error: "Invalid token." });
//   }
// };

export const isLoggedIn = (req, res, next) => {
  console.log("req", req);
  // Check for the authorization header and split it to extract the token
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(" ")[1];
  console.log("token", token);
  try {
    // Verify the token using the secret key from your environment variables
    console.log("process.env.JWT_SECRET", process.env.SECRET);
    const verified = jwt.verify(token, process.env.SECRET);
    console.log("verified", verified);
    // If verification is successful, attach the user data to the request object
    req.user = verified; // You can access user data in subsequent routes

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid or expired token
    return res.status(400).json({ error: "Invalid or expired token." });
  }
};
