import { cleanEnv, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    MONGO_URL: str(),
    PORT: str(),
  });
};

export default validateEnv;
