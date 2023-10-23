import { Pool } from "pg"
import { PASSWORD } from "../password";

// connect to the database
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: PASSWORD,
  database: 'WebDev-Lab3'
})

pool.connect();

export default pool;