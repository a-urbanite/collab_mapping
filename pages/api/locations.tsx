import type { NextApiRequest, NextApiResponse } from 'next'
import { starterSet, locationsType } from './starterSet'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<locationsType>
) {
  res.status(200).json(starterSet)
}