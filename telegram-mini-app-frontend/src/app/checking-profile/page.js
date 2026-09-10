"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import styles from "./CheckingProfile.module.css";
import useTelegram from "@/hooks/useTelegram";
import { authenticateTelegram } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

export default function CheckingProfilePage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const telegram = useTelegram();
  const user = telegram?.initDataUnsafe?.user;

  const authStarted = useRef(false);

  useEffect(() => {
    if (!telegram?.initData || !user || authStarted.current) return;

    authStarted.current = true;

    console.log("Telegram User:", user);
    console.log("id:", user.id);
    console.log("first_name:", user.first_name);
    console.log("last_name:", user.last_name);
    console.log("username:", user.username);
    console.log("photo_url:", user.photo_url);
    console.log("photo_url:", user.language_code);

    authenticateTelegram(telegram.initData)
      .then((data) => {
        console.log("Auth response:", data);

        if (!data.success) {
          console.error("Telegram authentication failed:", data.message);

          authStarted.current = false;
          return;
        }

        if (data.newUser) {
          router.push("/entering-information");
        } else {
          setUser(data.user);
          router.push("/welcome");
        }
      })
      .catch((error) => {
        console.error("Auth error:", error);
        authStarted.current = false;
      });
  }, [telegram?.initData, user, router, setUser]);

  return (
    <main>
      <div className="container">
        <div className="flex-layout">
          <div className="flex-layout__item"></div>

          <div className="flex-layout__item--centered">
            <div className={styles["checking-profile__icon"]}>
              <div className={styles["checking-profile__ring"]}>
                <div className={styles["checking-profile__dot"]}></div>
              </div>

              <div className={styles["checking-profile__icon-inner"]}>
                <svg className={styles["checking-profile__icon-inner-heart"]}>
                  <use href="/icons/heart.svg" />
                </svg>
              </div>
            </div>

            <h1 className="profile-check__title">
              Setting up your experience...
            </h1>

            <p className="profile-check__description">
              Checking connection and user profile credentials securely.
            </p>

            <div className="checking-profile__progress">
              <div className="checking-profile__progress-bar"></div>
            </div>
          </div>

          <div className="flex-layout__item"></div>
        </div>
      </div>
    </main>
  );
}
