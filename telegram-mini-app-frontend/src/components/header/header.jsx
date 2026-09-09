"use client";

import styles from "./header.module.css";

export default function headerComponent({
  title = "",
  showBack = false,
  rightIcon = false,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.container__icon}>
          {showBack && (
            <svg className={styles.container__svg}>
              <use href="/icons/back.svg" />
            </svg>
          )}
        </div>
        <h1 className={styles.container__text}>{title}</h1>
        <div className={styles.container__icon}>
          {rightIcon && (
            <svg className={styles.container__svg}>
              <use href="/icons/more.svg" />
            </svg>
          )}
        </div>
      </div>
    </header>
  );
}
