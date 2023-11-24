import { FaSpinner } from 'react-icons/fa'
import styles from './Loader.module.scss'
import variables from '../../app/variables.module.scss'

interface ILoader {
  size?: 'md' | 'sm'
  colorStyle?: 'primary' | 'secondary'
}

export default ({ size = 'md', colorStyle = 'primary' }: ILoader) => {
  const loaderSize = {
    sm: 25,
    md: 100,
  }
  return (
    <FaSpinner
      size={loaderSize[size]}
      className={styles.loader}
      styles={{
        color:
          colorStyle === 'primary'
            ? variables.primaryColor
            : variables.secondaryColor,
      }}
    />
  )
}
