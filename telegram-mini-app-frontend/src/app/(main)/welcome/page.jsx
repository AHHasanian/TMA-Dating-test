"use client";

import styles from "./Welcome.module.css";
import { useAuth } from "@/context/AuthContext";

export default function Welcome() {
  const { user, loading } = useAuth();
  return (
    <main className={styles["welcome"]}>
      <div className="container">
        <header className={styles["profile-setup__header"]}>
          <h1 className={styles["profile-setup__header-title"]}>Welcome</h1>
        </header>
        {/* title */}
        <div className={styles["welcome__title"]}>
          <h1 className={styles["welcome__title-text"]}>
            {/* Welcome back, {user.tma_first_name || ""} 👋 */}
          </h1>
          <p className={styles["welcome__title-description"]}>
            Here is a quick look at your profile status.
          </p>
        </div>
        {/* Main Content */}
        <div className={styles["welcome__profilet-card"]}>
          <div className={styles["welcome__profilet-avatar"]}>
            {/* <img
              className={styles["welcome__avatar-svg"]}
              src={user.tma_photo_url || "/icons/account.svg"}
            /> */}
          </div>

          <div className={styles["welcome__profilet-info"]}>
            <h3 className={styles["welcome__info-title"]}>
              {/* {user.tma_first_name} {user.tma_last_name} */}
            </h3>
            <p className={styles["welcome__info-description"]}>
              {/* {user.tma_age} years old */}
            </p>

            <div className={styles["welcome__profilet-status"]}>
              <span className={styles["welcome__status-icon"]}>✓</span>
              <span className={styles["welcome__status-text"]}>
                Your profile is ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
