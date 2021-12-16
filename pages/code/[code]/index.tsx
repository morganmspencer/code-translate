import MetaHead from '../../../components/MetaHead'
import { getCodes } from '../../api/codes'
import { getCodeLanguages } from '../../api/codes/[code]/languages'

export default function CodeLanguages({ languages }: LanguagesProps) {
  return (
    <>
      <MetaHead
        title="Languages"
      />
      <h1>Languages</h1>
      <ul>
        {languages.map(language => (
          <li key={language.slug}>
            {language.title}
            <div dangerouslySetInnerHTML={{ __html: language.content }} />
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticPaths() {
  const codes = getCodes()

  return {
    paths: codes.map((code: OptionalCode) => {
      return {
        params: {
          code: code.slug,
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }: StaticProps) {
  const languages = getCodeLanguages(params.code)

  return {
    props: { languages },
  }
}
