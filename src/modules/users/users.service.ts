import RegisterDTO from '~/modules/users/dtos/register.dto';
import UsersSchema from './users.model';
import { DataStoreInToken, TokenData } from '~/modules/auth';
import { isEmptyObject } from '~/core/helpers';
import { HTTPException } from '~/core/exceptions';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from '~/modules/users/users.interface';
import jsonwebtoken from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

class UsersService {
  public usersSchema = UsersSchema;

  public async createUser(model: RegisterDTO): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, 'Model is empty');
    }

    const user = await this.usersSchema.findOne({ email: model.email });

    if (user) {
      throw new HTTPException(
        StatusCodes.CONFLICT,
        `Your email ${model.email} has already existed`
      );
    }

    const avatar = gravatar.url(model.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(model.password, salt);

    const newUser = new this.usersSchema({
      first_name: model.first_name,
      last_name: model.last_name,
      email: model.email,
      password: hashedPassword,
      avatar,
      date: Date.now(),
    });

    await newUser.save();

    return this.createToken(newUser);
  }

  private createToken(user: IUser): TokenData {
    const dataInToken: DataStoreInToken = { id: user._id };
    const secret: string = process.env.JWT_TOKEN_SECRET!;
    const expiresIn = 60;

    return {
      token: jsonwebtoken.sign(dataInToken, secret, { expiresIn }),
    };
  }
}

export default UsersService;
