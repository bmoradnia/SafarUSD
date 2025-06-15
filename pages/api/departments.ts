import type { NextApiRequest, NextApiResponse } from 'next';
import departments from '../../departments.json';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(departments);
}
