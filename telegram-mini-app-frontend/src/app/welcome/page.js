import styles from "./Welcome.module.css";

export default function Welcome() {
  return (
    <main className={styles["welcome"]}>
      <div className="container">
        <header className={styles["profile-setup__header"]}>
          <h1 className={styles["profile-setup__header-title"]}>Welcome</h1>
        </header>
        {/* title */}
        <div className={styles["welcome__title"]}>
          <h1 className={styles["welcome__title-text"]}>
            Welcome back, Amir 👋
          </h1>
          <p className={styles["welcome__title-description"]}>
            Here is a quick look at your profile status.
          </p>
        </div>
        {/* Main Content */}
        <div className={styles["welcome__profilet-card"]}>
          <div className={styles["welcome__profilet-avatar"]}>
            <img
              className={styles["welcome__avatar-svg"]}
              src="/icons/account.svg"
            />
          </div>

          <div className={styles["welcome__profilet-info"]}>
            <h3 className={styles["welcome__info-title"]}>
              Amir Hossein Hasanian
            </h3>
            <p className={styles["welcome__info-description"]}>24 years old</p>

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
