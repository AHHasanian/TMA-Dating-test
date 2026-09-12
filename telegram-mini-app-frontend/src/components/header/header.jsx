"use client";

import styles from "./header.module.css";
import { useRouter } from "next/navigation";

export default function HeaderComponent({
  title = "",
  showBack = false,
  rightIcon = false,
}) {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.container__icon}>
          {showBack && (
            <button
              className={styles.container__button}
              onClick={() => router.back()}
            >
              <svg className={styles.container__svg}>
                <use href="/icons/back.svg" />
              </svg>
            </button>
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
