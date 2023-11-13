import { loadEnv } from 'vite';
import dotenv from 'dotenv'

dotenv.config(); // load env vars from .env

export default ({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [],
        define: {
            'import.meta.env.VITE_VERCEL_ANALYTICS_ID': JSON.stringify(env.VERCEL_ANALYTICS_ID),
        }
    }
}