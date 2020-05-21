const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT || 8080,
    SENDGRID_API: process.env.SENDGRID_API,
    DYNAMSOFT_KEY: process.env.DYNAMSOFT_KEY,
    ACS_FACE_KEY: process.env.ACS_FACE_KEY,
    ACS_FACE_URL: process.env.ACS_FACE_URL
};