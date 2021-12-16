import Link from 'next/link'
import MetaHead from '../../components/MetaHead'
import { getCodes } from '../api/codes'

export default function Codes({ codes }: CodesProps) {
  return (
    <>
      <MetaHead
        title="Languages"
      />
      <h1>Codes</h1>
      <ul>
        {codes.map(code => (
          <li key={code.slug}>
            <Link href={`/codes/${code.slug}`}>{code.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const codes = getCodes()

  return {
    props: { codes },
  }
}
