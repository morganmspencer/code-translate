import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
var md = require('markdown-it')()
import type { NextApiRequest, NextApiResponse } from 'next'

const languagesDirectory = join(process.cwd(), '_content/languages')

export function getLanguageBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')

  const fullPath = join(languagesDirectory, `${realSlug}.md`)

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  var theData: OptionalLanguage = {}

  if (fields !== undefined && fields.length) {
    fields.forEach((field) => {
      if (field === 'slug') {
        theData[field] = realSlug
      }
      if (field === 'content') {
        theData[field] = md.render(content)
      }
      if (data[field]) {
        theData[field] = data[field]
      }
    })
  } else {
    theData = { slug: realSlug, ...data, content: md.render(content) }
  }

  return theData
}

export function getLanguages(fields: string[] = []) {
  if (!fs.existsSync(languagesDirectory)) {
    return []
  }

  const slugs = fs.readdirSync(languagesDirectory)

  const content = slugs
    .map((slug) => getLanguageBySlug(slug, fields))
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

  const content = getLanguages(fields)
  res.status(200).json(content)
}
