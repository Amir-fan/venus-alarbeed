import styles from './Spinner.module.css';

interface Props {
  className?: string;
}

export default function Spinner({ className = '' }: Props) {
  return (
    <svg className={`${styles.spinner} ${className}`} viewBox="0 0 50 50">
      <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
    </svg>
  );
}
