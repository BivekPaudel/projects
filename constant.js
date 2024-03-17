import { config } from "dotenv";

config()
export let port =process.env.PORT;
export let dbUrl =process.env.DB_URL;
export let clientUrl =process.env.CLIENT_URL;
export let serverUrl =process.env.SERVER_URL;
export let user =process.env.USER;
export let pass =process.env.PASS;
export let secretKey =process.env.SECRET_KEY;
