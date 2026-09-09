"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "./cardProfile.module.css";

export default function Cardprofile() {
  const { user, loading } = useAuth();
  return (
    <div className={styles["welcome__profilet-card"]}>
      <div className={styles["welcome__profilet-avatar"]}>
        <svg className={styles["welcome__avatar-svg"]}>
          <use href={user?.tma_photo_url || "/icons/account.svg"} />
        </svg>
      </div>

      <div className={styles["welcome__profilet-info"]}>
        <h3 className={styles["welcome__info-title"]}>
          {user?.tma_first_name || "Anonymous User"} {user?.tma_last_name}
        </h3>
        <p className={styles["welcome__info-description"]}>
          {user?.tma_age || "18"} years old
        </p>

        <div className={styles["welcome__profilet-status"]}>
          <span className={styles["welcome__status-icon"]}>✓</span>
          <span className={styles["welcome__status-text"]}>
            Your profile is ready
          </span>
        </div>
      </div>
    </div>
  );
}
