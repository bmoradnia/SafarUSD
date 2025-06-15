import type { NextApiRequest, NextApiResponse } from 'next';

export function authBasic(req: NextApiRequest, res: NextApiResponse): boolean {
  const auth = req.headers.authorization;
  const user = process.env.ADMIN_USER || '';
  const pass = process.env.ADMIN_PASS || '';
  if (!auth || auth !== 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64')) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure"');
    res.end('Access denied');
    return false;
  }
  return true;
}
