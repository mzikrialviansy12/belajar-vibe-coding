import { Elysia } from 'elysia';
import { userRoutes } from './routes/users';

const port = process.env.PORT || 3000;

const app = new Elysia()
  .use(userRoutes)
  .get('/', () => ({ message: 'Welcome to Elysia + Drizzle + MySQL API!' }))
  .listen(port);

console.log(`🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`);
