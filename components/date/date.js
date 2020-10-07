import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './date.module.scss'

export default function Date({ date, size = 'md' }) {
  const parsedDate = parseISO(date)
  return (
    <time
      className={[styles.date, styles[size]].join(' ')}
      dateTime={date}
    >
      {format(parsedDate, `d 'de' LLLL 'de' yyyy`,  { locale: ptBR })}
    </time>
  )
}
