import Link from 'next/link'
import MetaHead from '../../components/MetaHead'
import { getLanguages } from '../api/languages'

export default function Languages({ languages }: LanguagesProps) {
  return (
    <>
      <MetaHead
        title="Languages"
      />
      <h1>Languages</h1>
      <ul>
        {languages.map(language => (
          <li key={language.slug}>
            <Link href={`/languages/${language.slug}`}>{language.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const languages = getLanguages()

  return {
    props: { languages },
  }
}
