import styles from "./SettingsListItem.module.css";

import Link from "next/link";

export default function SettingsListItem({
  icon,
  title,
  subtitle,
  rightText,
  arrow = true,
  onClick,
  href,
}) {
  return (
    <Link className={styles.row} href={href} onClick={onClick}>
      <div className={styles.rowIcon__container}>
        <svg className={styles.rowIcon}>
          <use href={icon} />
        </svg>
      </div>
      <div className={styles.rowtext__container}>
        <span className={styles.rowTitle}>{title}</span>
        <span className={styles.rowSubtitle}>{subtitle}</span>
      </div>
      <div className={styles.rowRight__container}>
        {rightText && <span className={styles.rowRight}>{rightText}</span>}

        {arrow && (
          <svg className={styles.arrow}>
            <use href="/icons/arrow-forward.svg" />
          </svg>
        )}
      </div>
    </Link>
  );
}
