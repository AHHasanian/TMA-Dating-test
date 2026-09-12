"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./cardProfile.module.css";

export default function Cardprofile() {
  const { user, loading } = useAuth();

  const [photoUrl, setPhotoUrl] = useState("/icons/account.svg");

  useEffect(() => {
    if (!user) return;

    setPhotoUrl(user.tma_photo_url || "/icons/account.svg");
  }, [user]);

  if (loading) {
    return null;
  }

  return (
    <div className={styles["welcome__profilet-card"]}>
      <div className={styles["welcome__profilet-avatar"]}>
        <img
          src={photoUrl}
          alt="Profile"
          className={styles["welcome__avatar-svg"]}
        />
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
