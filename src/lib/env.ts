import "dotenv/config";

const { PORT, DB_URL } = process.env;

const ENV = {
  PORT: (parseInt(PORT!) as number) || 3000,
  DB_URL: (DB_URL! as string) || "",
} as const;

export default ENV;
