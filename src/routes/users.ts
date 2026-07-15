import { Elysia, t } from 'elysia';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export const userRoutes = new Elysia({ prefix: '/api/users' })
  .get('/', async () => {
    return await db.select().from(users);
  })
  .get('/:id', async ({ params: { id }, error }) => {
    const result = await db.select().from(users).where(eq(users.id, Number(id)));
    if (result.length === 0) {
      return error(404, { message: 'User not found' });
    }
    return result[0];
  })
  .post('/', async ({ body }) => {
    const result = await db.insert(users).values(body);
    return {
      success: true,
      message: 'User created successfully',
      id: result[0].insertId,
    };
  }, {
    body: t.Object({
      name: t.String({ minLength: 1 }),
      email: t.String({ format: 'email' }),
    }),
  })
  .put('/:id', async ({ params: { id }, body, error }) => {
    const result = await db.update(users)
      .set(body)
      .where(eq(users.id, Number(id)));
    
    if (result[0].affectedRows === 0) {
      return error(404, { message: 'User not found or no changes made' });
    }
    return {
      success: true,
      message: 'User updated successfully',
    };
  }, {
    body: t.Object({
      name: t.Optional(t.String({ minLength: 1 })),
      email: t.Optional(t.String({ format: 'email' })),
    }),
  })
  .delete('/:id', async ({ params: { id }, error }) => {
    const result = await db.delete(users).where(eq(users.id, Number(id)));
    if (result[0].affectedRows === 0) {
      return error(404, { message: 'User not found' });
    }
    return {
      success: true,
      message: 'User deleted successfully',
    };
  });
