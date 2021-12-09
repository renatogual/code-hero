import styles from "./styles.module.scss";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  number,
  isCurrent = false,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button className={`${styles.commonButton} ${styles.currentButton}`}>
        {number}
      </button>
    );
  }

  return (
    <button
      className={styles.commonButton}
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  );
}
