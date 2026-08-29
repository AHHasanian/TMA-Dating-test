import styles from "./CreatingProfile.module.css";

export default function CreatingProfilePage() {
  return (
    <main>
      <div className="container">
        <div className="flex-layout">
          <div className="flex-layout__item"></div>
          <div className="flex-layout__item--centered">
            <div className={styles["creating-profile__loader"]}>
              <div className={styles["creating-profile__ring"]}></div>

              <div
                className={`${styles["creating-profile__ring"]} ${styles["creating-profile__ring--delayed"]}`}
              ></div>

              <div className={styles["creating-profile__icon"]}>
                <img
                  className={styles["checking-profile__icon-inner-loading"]}
                  src="/icons/loading.svg"
                  alt="heart icon"
                />
              </div>
            </div>
            <h1 className="profile-check__title">Creating your profile...</h1>
            <p className="profile-check__description">
              Please wait a moment while we securely save your information to
              our database.
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
