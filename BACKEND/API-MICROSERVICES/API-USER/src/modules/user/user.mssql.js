const mssqlcon = require('../../database/database');
class UserMSSql {
  async getAllUsers() {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request().query('SELECT * FROM db_users');
    return res.recordset;
  }

  async getUsers(id) {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request().input('id', id).query('SELECT * FROM db_users WHERE id = @id');
    return res.recordset;
  }

  async addUser(prod) {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request()
    .input("firstname", prod.firstname)
    .input("lastname", prod.lastname)
    .input("password", prod.password)
    .input("email", prod.email)
    .input("address", prod.address)
    .input("tel", prod.tel)
    .input("status", prod.status)
    .input("role", prod.role)
    .execute("dbo.addUser");
    return res;
 }

 async updateUsers(id, prod) {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request()
    .input("id", id)
    .input("firstname", prod.firstname)
    .input("lastname", prod.lastname)
    .input("password", prod.password)
    .input("email", prod.email)
    .input("address", prod.address)
    .input("tel", prod.tel)
    .input("status", prod.status)
    .input("role", prod.role)
    .execute("dbo.updateUser");
    return res;
  }

 async deleteUser(id) {
   const conn = await mssqlcon.getConnection();
   const res = await conn.request()
   .input("ID", id)
   .execute("deleteUser");
   return res;
 }

  async getUserByEmail(email) {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request().input('email', email).query('SELECT * FROM db_users WHERE email = @email');
    return res.recordset;
  }

}

module.exports = new UserMSSql();