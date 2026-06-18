import { createHmac } from 'node:crypto';

const secret = process.env.JWT_SECRET || 'inventory-demo-secret';

const base64Url = (input: string | Buffer) => Buffer.from(input).toString('base64url');

export const signJwt = (payload: Record<string, unknown>) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = { ...payload, iat: Math.floor(Date.now() / 1000) };
  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedBody = base64Url(JSON.stringify(body));
  const signature = createHmac('sha256', secret).update(`${encodedHeader}.${encodedBody}`).digest('base64url');
  return `${encodedHeader}.${encodedBody}.${signature}`;
};
