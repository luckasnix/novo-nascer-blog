import Link from 'next/link'
import styles from './pagination.module.scss'

export default function Pagination({ numOfPages, curPage, path, param }) {
  const prevPage = +curPage - 1
  const nextPage = +curPage + 1
  return (
    <div className={styles.pagination}>
      <div className={styles.wrapper}>
        {(!!prevPage && prevPage > 0) && (
          <Link href={`${path}/[${param}]`} as={`${path}/${prevPage}`}>
            <a className={[styles.link, styles.prevPage].join(' ')}>&larr; Anterior</a>
          </Link>
        )}
        <span className={styles.curPage}>{curPage}</span>
        {(!!nextPage && nextPage <= numOfPages) && (
          <Link href={`${path}/[${param}]`} as={`${path}/${nextPage}`}>
            <a className={[styles.link, styles.nextPage].join(' ')}>Próxima &rarr;</a>
          </Link>
        )}
      </div>
    </div>
  )
}
