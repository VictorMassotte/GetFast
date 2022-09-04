require('dotenv').config();
const mssql = require('mssql');

class DBConnection {
  async getConnection() {
     try {
       return await mssql.connect({
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              server: process.env.DB_SERVER,
              database: process.env.DB_DATABASE,
              port: 1433,
              options: {
                encrypt: false,
                trustServerCertificate: true,
                }
       });
    }
    catch(error) {
      console.log(error);
    }
  }
}
module.exports = new DBConnection();