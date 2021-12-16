import type { NextApiRequest, NextApiResponse } from 'next'
import { getCodeLanguageBySlug } from '../index'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }

  const code = req.query.code.toString()
  const slug = req.query.language.toString()
  const queryFields = req.query.fields.toString()

  let fields: string[]
  if (queryFields) {
    fields = queryFields.split(',')
  } else {
    fields = []
  }

  const content = getCodeLanguageBySlug(code, slug, fields)
  res.status(200).json(content)
}
