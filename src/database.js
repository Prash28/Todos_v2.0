import pg from "pg";

const {Pool} = pg;
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5434,
    database: "todosapp"
})

// pool.query(`insert into tododetails(id, title, description, status) values(1003, 'KT', 'Setup softwares for new members', 'Pending');`)
//     .then((res) => {
//         console.log("Query run successful!");
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

export default pool;