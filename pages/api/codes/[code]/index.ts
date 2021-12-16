import { getCodeBySlug } from '../../codes'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }

  const slug = req.query.code.toString()
  const queryFields = req.query.fields.toString()

  let fields: string[]
  if (queryFields) {
    fields = queryFields.split(',')
  } else {
    fields = []
  }

  const content = getCodeBySlug(slug, fields)
  res.status(200).json(content)
}
