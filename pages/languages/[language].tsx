import MetaHead from '../../components/MetaHead'
import { getLanguages, getLanguageBySlug } from '../api/languages'

export default function Language({ language }: LanguageProps) {
  return (
    <>
      <MetaHead
        title={`${language.title} | Languages`}
      />
      <h1>{language.title}</h1>
    </>
  )
}

export async function getStaticPaths() {
  const languages = getLanguages()

  return {
    paths: languages.map((language: OptionalLanguage) => {
      return {
        params: {
          language: language.slug,
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }: StaticProps) {
  const language = getLanguageBySlug(params.language)

  return {
    props: { language },
  }
}
