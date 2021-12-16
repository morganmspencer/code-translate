export default function Wrapper ({ condition, wrapper, children }: WrapperProps) {
  return condition ? wrapper(children) : children
}
