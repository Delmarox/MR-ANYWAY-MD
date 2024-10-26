const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUhBYytaVHU4N3lENU1lbGt0NVhuY3VqOXIwdHBWZU5sTFVieHN3dEtuQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHQ5Vk1JemJTY3VBQTNlVWUyc1kwSkIzNDNmdWQzVi9Fd0x4R3B1ZHVXdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSFd1OUxHSmk4MXdad2p5V242cEp3NmEyMnh2djNXL2MyRm90QzZUT0VVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyZUt5bHVjM0VCUFhVZGhJL3NLTjR6b0k3dzRXUnR2MjJ1K1hpV2pUWDBrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1LUytVajdXdndUR2xGSXdwaVhlUXhxOTQwbmUyNGU4SlFQam96SFNnWHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikx4V2pjbGZjY3p4TDZBbVhGRlpNRzQxQ2RlOEJTQ0ZOU05rQ2N4bW5wVmc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUxROC9xTEpwMnE2Yi9TQ2FaUUZoclJZczZuNUEyNXVDeGN5Z0Z3aXludz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibER1M0JWaVV2V1pkc201ZElyRFh0bU0vUkZ0dnI0WkVvNW5EQy9NWGQxZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklIY051dno5eU9EVHJkNVNVVGNKRkdydmMwVStCeEpENWZTemwzVDZQZ1pYeTNjblF5bnhoVVNFVW53Mjg5cGt5dmNYcWpsRmdTTHZyODAyckVtMkRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU0LCJhZHZTZWNyZXRLZXkiOiJCVGNBY3RFeDdCWjFJaGNpWWVCQ0ZjQzVJNjlMOGpiOFVQaWIvSmhTS0hvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJRSUR3SHVrVVNoNnVXZWR6Um9PYkdRIiwicGhvbmVJZCI6IjNlOGU4MjUzLTJmYmMtNDIzYS05NWYzLWNkNDZhNTA3Y2U4ZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrbkFEcllHbmVXc2d4OE9YeThvKytpTHRudjg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidmtrYkxNNVNoVy9LNUNBckNaRUVBbUVVM05rPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlZONDhCQkpNIiwibWUiOnsiaWQiOiIyNjM3ODczODI4NTI6NjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSzI5cHJvbWF4In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJZnA4dk1GRUw2UDhyZ0dHQ1VnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJZK2JoYytGZHhpdFRyK0ltVURRM3NDQmhONllSL2tUaUxUdVg5TlBZYVQwPSIsImFjY291bnRTaWduYXR1cmUiOiJoRUF3b2V2TmV3aDNLQzBDVXZIeFMxeEZwNEUzcXNiU1kxNjIwaFRTRUQvcVhvR3FpWUtRb3YrZExTT1U1MCtheFp3QUtRSDJFR3BoMzgyYXFWcDZDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoieG5TRU9YQyt1R2M4dkV3SWUwTGhhOXdldmxwVlNZWkFoOGtWb085STdxL0lzbkZPcmxLQitGRVNrbmVsbXArZCtlclpoZVhTbDZya2lxSkhKSXZZQUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODczODI4NTI6NjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV1BtNFhQaFhjWXJVNi9pSmxBME43QWdZVGVtRWY1RTRpMDdsL1RUMkdrOSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTkyMzAyMH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
