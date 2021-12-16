import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
var md = require('markdown-it')()
import type { NextApiRequest, NextApiResponse } from 'next'

const codesDirectory = join(process.cwd(), '_content/code')

export function getCodeBySlug(slug: string, fields: string[] = []) {
  const fullPath = join(codesDirectory, `${slug}/_index.md`)

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  var theData: OptionalCode = {}

  if (fields !== undefined && fields.length) {
    fields.forEach((field) => {
      if (field === 'slug') {
        theData[field] = slug
      }
      if (field === 'content') {
        theData[field] = md.render(content)
      }
      if (data[field]) {
        theData[field] = data[field]
      }
    })
  } else {
    theData = {slug, ...data, content: md.render(content)}
  }

  return theData
}

export function getCodes(fields: string[] = []) {
  if (!fs.existsSync(codesDirectory)) {
    return []
  }

  const slugs =
    fs.readdirSync(codesDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

  const content = slugs
    .map((slug) => getCodeBySlug(slug, fields))
    .sort((content1, content2) => (
      content1.title < content2.title ? -1 : 1
    ))

  return content
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).end()
  }

  const queryFields = req.query.fields.toString()

  let fields: string[]
  if (queryFields) {
    fields = queryFields.split(',')
  } else {
    fields = []
  }

  const content = getCodes(fields)
  res.status(200).json(content)
}
