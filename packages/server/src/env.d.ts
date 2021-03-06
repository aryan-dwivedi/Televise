declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    NODE_ENV: string;
    SMTP_HOST: string;
    SMTP_USER: string;
    SMTP_PASS: string;
  }
}