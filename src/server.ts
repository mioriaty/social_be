import App from '~/app';
import { Route } from '~/core/interfaces';
import IndexRoute from '~/modules/index/index.route';
import 'dotenv/config';

const routes: Route[] = [new IndexRoute()];

const app = new App(routes);

app.listen();
