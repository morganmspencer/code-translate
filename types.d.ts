type BaseEntry = {
  title: string
  slug: string
  content: string
}

type OptionalBaseEntry = {
  title?: string
  slug?: string
  content?: string
  [x: string]: any
}

interface Code extends BaseEntry {}
interface OptionalCode extends OptionalBaseEntry {}

type CodesProps = {
  codes: Code[]
}

interface Language extends BaseEntry {}
interface OptionalLanguage extends OptionalBaseEntry {}

type LanguageProps = {
  language: Language
}

type LanguagesProps = {
  languages: Language[]
}

type LayoutProps = {
  children: JSX.Element
}

type MetaHeadProps = {
  title?: string
  description?: string
  type?: string
  image?: string
  authorTwitter?: string
}

type NavLinkProps = {
  href: string
  title: string
}

type StaticProps = {
  params: {
    [x: string]: any
  }
}

type WrapperProps = {
  condition: boolean
  wrapper: Function
  children: JSX.Element
}
