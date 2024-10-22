const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkZBQzVKb2hlenh1RUMrTmNXNnN3Q0lTbDB5Y2YrMkp6T04vb1dhcGJrQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0xMUTc3bzZ6bTNPalVrY1FqVlVidVUyZ2VhZnRjWXFnTlBmbFV2aUN4cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhT2V1WFA2aW41ZW5FbFM0czNUdXFRWjdtTzYyLzF2aUpLZlBlVDdJNlV3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6K3RNb0Y4cDBWSDBVUUVVQ2ZxZXlpNVZVeXV3WWszRUFqT2FrcGIramlNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVCU0ovWkVXTHN4SUFXRUo5UUw0Tk1XL3JUUkEzNWJHYmJJdW9GRUhBVlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktvdFFIbTV5Qy82SEd4UjhEZVdSUzlOaGErUTJRaC8vR3UvRm1acFhMaGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ05ydHczQWQzcEU1bXBWeXNjQkpJa1NUVkdjV0tqK29PNWMwWFM4Nzgzbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVE4xL1JRODEybVdjZFhqN0dYbk5wcCtwV0RvNmNTUUE4elBocnFZcTRsTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhZb3Y2OGE2WTV2Q3htSkN4TkVNdzVnVkwrcUVCVEcxQnMxZ3FtbmEzMHNkUXE1b0FoaStkUUJOa052empPdWdVVEh6N3FsK2ZqN3F1OCtPV3BWSGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDgsImFkdlNlY3JldEtleSI6InN3OFE0ek9obTBwR0FJenZIZktva2NVcVNXWWxFbjgxTDdjcXlXOElKaXM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjo2NSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjY1LCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjVHcFlhMTY2UnJXdEpHbFNGblhzYlEiLCJwaG9uZUlkIjoiZjRmOTQzNjYtYjMyOS00YWNiLWI4MzYtZmFiNWQxMmI0YWI3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhPMlNnWHhZS3h0SW1WSEo1eS9EOVhIcGEvaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxK0NZNk90RE5FK1NwaDlIQ3I4UEs5cTRhZ1k9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQjdFM1hIS0giLCJtZSI6eyJpZCI6IjI2MzcxNzY3MjA2ODo5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IjI2MzcxNzY3MjA2OCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHJKMC9vREVJdW8zYmdHR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiV0NSUjBkVUhVYkg4RFVnYVR6cmRnR055MjVWSmJBblpxVkpveldhLzAxST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUVNFUDlJYWc5bFdBaW9yK2haMm1jSU1rUzl1UW1NZmhRNVBiaWM2Nks2RVlKcmkydUYzSFhKNkg2K29OcFI5N3VZYzl5ZmlGajJXWUZBbFN3VUNkQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6ImtEUXdaWVRlbHdta1dFaWJrRklWSHJ5SzFNa3Ywbzl4eTVKVXhJN2ZKMXYwWjhyRzJ6alNmOWExQmdUL2lwcHIwaWhwNlNyZnJiYW9UdERGYUJqZmdnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzE3NjcyMDY4OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVmdrVWRIVkIxR3gvQTFJR2s4NjNZQmpjdHVWU1d3SjJhbFNhTTFtdjlOUyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTU4MjEwNSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFZjMifQ==',
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
