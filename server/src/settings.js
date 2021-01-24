import dotenv from 'dotenv';

dotenv.config();
export const connectionString = process.env.CONNECTION_STRING;
export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
