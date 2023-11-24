import styles from './Header.module.scss'

interface IHeader {
  title: string
}

export default ({ title }: IHeader) => {
  return (
    <div className={styles.titleContainer}>
      <span className={styles.title}>{title}</span>
    </div>
  )
}
