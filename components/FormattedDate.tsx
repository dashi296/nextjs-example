type Props = {
  date?: string
}

const FormattedDate = ({
  date
}: Props) => {
  if(!date) {
    return null
  }

  const dateInstance = new Date(date)

  return (
    <time>{`${dateInstance.toLocaleDateString('ja-JP')} ${dateInstance.toLocaleTimeString('ja-JP')}`}</time>
  )
}

export default FormattedDate