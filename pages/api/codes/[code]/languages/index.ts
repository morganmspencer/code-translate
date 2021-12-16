import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
var md = require('markdown-it')()
import { getLanguageBySlug } from '../../../languages'
import type { NextApiRequest, NextApiResponse } from 'next'

const codesDirectory = join(process.cwd(), '_content/codes')

export function getCodeLanguageBySlug(code: string, slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')

  const fullPath = join(codesDirectory, `${code}/${realSlug}.md`)

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const languageData = realSlug !== '_index' ? getLanguageBySlug(realSlug) : undefined

  var theData: OptionalLanguage = {}

  if (fields !== undefined && fields.length) {
    fields.forEach((field) => {
      if (field === 'title' && languageData) {
        theData[field] = languageData.title
      }
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
    theData = {
      title: languageData?.title,
      slug: realSlug,
      content: md.render(content),
      ...data,
    }
  }

  return theData
}

export function getCodeLanguages(code: string, fields: string[] = []) {
  if (!fs.existsSync(`${codesDirectory}/${code}`)) {
    return []
  }

  const slugs = fs.readdirSync(`${codesDirectory}/${code}`)

  const content = slugs
    .map((slug) => getCodeLanguageBySlug(code, slug, fields))
    .filter((context) => {
      if (context.slug !== '_index') return true
    })
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

  const code = req.query.code.toString()
  const queryFields = req.query.fields.toString()

  let fields: string[]
  if (queryFields) {
    fields = queryFields.split(',')
  } else {
    fields = []
  }

  const content = getCodeLanguages(code, fields)
  res.status(200).json(content)
}
