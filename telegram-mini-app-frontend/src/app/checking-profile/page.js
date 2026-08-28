import styles from "./CheckingProfile.module.css";

export default function CheckingProfilePage() {
  return (
    <main>
      <div className="container">
        <div className={styles["flex-layout"]}>
          <div className={styles["flex-layout__item"]}></div>
          <div className={styles["flex-layout__item--centered"]}>
            <div className={styles["checking-profile__icon"]}>
              <div className={styles["checking-profile__ring"]}>
                <div className={styles["checking-profile__dot"]}></div>
              </div>
              <div className={styles["checking-profile__icon-inner"]}>
                <img
                  className={styles["checking-profile__icon-inner-heart"]}
                  src="/icons/heart.svg"
                  alt="heart icon"
                />
              </div>
            </div>
            <h1 className={styles["profile-check__title"]}>
              Setting up your experience...
            </h1>
            <p className={styles["profile-check__description"]}>
              Checking connection and user profile credentials securely.
            </p>
            <div className={styles["checking-profile__progress"]}>
              <div className={styles["checking-profile__progress-bar"]}></div>
            </div>
          </div>
          <div className={styles["flex-layout__item"]}></div>
        </div>
      </div>
    </main>
  );
}
