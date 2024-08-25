const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

// module.exports = {
//   port: process.env.PORT || 8000,
//   site_url: process.env.SITE_URL,
//   node_env: process.env.NODE_ENV,
//   DB_URL: process.env.DB_URL,
//   jwt_access_token: process.env.JWT_ACCESS_TOKEN,
//   access_secret: process.env.ACCESS_TOKEN_SECRET,
//   refresh_secret: process.env.REFRESH_TOKEN_SECRET,
//   smtp_username: process.env.SMTP_USERNAME,
//   smtp_password: process.env.SMTP_PASSWORD,
//   otp_expire_time: process.env.OTP_EXPIRY_TIME,
// };

module.exports = {
  port: 8000,
  node_env: "production",
  DB_URL:
    "mongodb+srv://user1:nNdKrh8fEVstinjv@team-codecanyon.ffrshve.mongodb.net/quiz?retryWrites=true&w=majority&appName=Team-CodeCanyon",
  jwt_access_token:
    "c362d2567sad403fe0e4352d984bdf85c43d22bf6935eb31b3bc7c0580a1f45",
  access_secret: "quiz@@accesstokensecret@12345",
  refresh_secret: "quiz@@refreshtokensecret@12345",
  smtp_username: "sohaghossain7th@gmail.com",
  smtp_password: "yvlsmyxiugybdkjd",
  otp_expire_time: 3,
};
