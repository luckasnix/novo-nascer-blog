import styles from './headline.module.scss'

export default function Headline({ title }) {
  return (
    <div className={styles.headline}>
      <div className={styles.wrapper}>
        <h1>{title}</h1>
      </div>
    </div>
  )
}
