import bcryptjs from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import jsonwebtoken from 'jsonwebtoken';
import { HTTPException } from '~/core/exceptions';
import { isEmptyObject } from '~/core/helpers';
import { DataStoreInToken, TokenData } from '~/modules/auth';
import LoginDTO from '~/modules/auth/dtos/login.dto';
import { IUser, UsersSchema } from '~/modules/users';

class AuthService {
  public usersSchema = UsersSchema;

  public async login(model: LoginDTO): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, 'Model is empty');
    }

    const user: IUser | null = await this.usersSchema.findOne({ email: model.email });

    if (!user) {
      throw new HTTPException(StatusCodes.NOT_FOUND, 'User not found');
    }

    const isMatchPassword = await bcryptjs.compare(model.password, user.password);

    if (!isMatchPassword) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, 'Credentials are not correct');
    }

    return this.createToken(user);
  }

  private createToken(user: IUser): TokenData {
    const dataInToken: DataStoreInToken = { id: user._id };
    const secret: string = process.env.JWT_TOKEN_SECRET!;
    const expiresIn = 60;

    return {
      token: jsonwebtoken.sign(dataInToken, secret, { expiresIn }),
    };
  }

  public async getCurrentUser(userId: string): Promise<IUser | null> {
    const user = await this.usersSchema.findById(userId);

    if (!user) {
      throw new HTTPException(StatusCodes.NOT_FOUND, 'User not found');
    }

    return user;
  }
}

export default AuthService;
