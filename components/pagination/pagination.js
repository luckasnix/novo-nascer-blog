import Link from 'next/link'
import styles from './pagination.module.scss'

export default function Pagination({ numOfPages, curPage }) {
  const prevPage = +curPage - 1
  const nextPage = +curPage + 1
  return (
    <div className={styles.pagination}>
      <div className={styles.wrapper}>
        {(!!prevPage && prevPage > 0) && (
          <Link href='/postagens/[page]' as={`/postagens/${prevPage}`}>
            <a className={[styles.link, styles.prevPage].join(' ')}>&larr; Anterior</a>
          </Link>
        )}
        {(!!nextPage && nextPage <= numOfPages) && (
          <Link href='/postagens/[page]' as={`/postagens/${nextPage}`}>
            <a className={[styles.link, styles.nextPage].join(' ')}>Próxima &rarr;</a>
          </Link>
        )}
      </div>
    </div>
  )
}
