import styles from "./enteringInformation.module.css";

export default function enteringInformationPage() {
  return (
    <main>
      <div className="container">
        <div className={styles["profile-setup"]}>
          <header className={styles["profile-setup__header"]}>
            <h1 className={styles["profile-setup__header-title"]}>
              Profile Setup
            </h1>
          </header>
          {/* Main Content  */}
          <section className={styles["profile-setup__content"]}>
            <div className={styles["profile-setup__intro"]}>
              <h2 className={styles["profile-setup__title"]}>
                Let's get to know you
              </h2>

              <p className={styles["profile-setup__description"]}>
                Complete your profile to get started.
              </p>
            </div>

            <form className={styles["profile-setup__form"]}>
              <div className={styles["profile-setup__field"]}>
                <label
                  className={styles["profile-setup__label"]}
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className={styles["profile-setup__input"]}
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="e.g. Alex"
                />
              </div>
              <div className={styles["profile-setup__field"]}>
                <label
                  className={styles["profile-setup__label"]}
                  htmlFor="lastName"
                >
                  Last Name
                </label>

                <input
                  className={styles["profile-setup__input"]}
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="e.g. Smith"
                />
              </div>
              <div className={styles["profile-setup__field"]}>
                <label className={styles["profile-setup__label"]} htmlFor="age">
                  Age
                </label>

                <input
                  className={styles["profile-setup__input"]}
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  max="120"
                  placeholder="25"
                />
              </div>
            </form>
            <div className={styles["profile-setup__illustration"]}>
              <img
                className={styles["profile-setup__illustration-image"]}
                src="/images/Decorative Area.jpg"
                alt="Profile setup"
              />
            </div>
            <div className={styles["profile-setup__holderspace"]}> </div>
          </section>
          <div className={styles["profile-setup__actions"]}>
            <div className={styles["profile-setup__actions-inner"]}>
              <button
                type="submit"
                className={styles["profile-setup__button--primary"]}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
