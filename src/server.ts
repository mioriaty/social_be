import 'dotenv/config';

import App from '~/app';
import { Route } from '~/core/interfaces';

import { validateEnv } from '~/core/utils';
import { AuthRoute } from '~/modules/auth';
import { IndexRoute } from '~/modules/index';
import { UserRoute } from '~/modules/users';

validateEnv();

const routes: Route[] = [new IndexRoute(), new UserRoute(), new AuthRoute()];

const app = new App(routes);

app.listen();
