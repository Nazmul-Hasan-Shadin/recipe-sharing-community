import dotenv from "dotenv";

dotenv.config();
export default {
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  bcrypt_salt: process.env.BCRYPT_SALT,
  jwt_access_token_secret: process.env.JWT_ACCESSTOKEN_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  node_env:process.env.NODE_ENV
};
