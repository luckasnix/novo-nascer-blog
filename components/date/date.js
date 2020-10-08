import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default function Date({ date }) {
  const parsedDate = parseISO(date)
  return (
    <time dateTime={date}>
      {format(parsedDate, `d 'de' LLLL 'de' yyyy`,  { locale: ptBR })}
    </time>
  )
}
