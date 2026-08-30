"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./enteringInformation.module.css";
import { createUser } from "@/services/api";
import useTelegram from "@/hooks/useTelegram";

export default function EnteringInformationPage() {
  const router = useRouter();
  const telegram = useTelegram();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const telegramUser = telegram?.initDataUnsafe?.user;

      if (!telegramUser?.id) {
        throw new Error("Telegram user information is not available");
      }

      const data = await createUser({
        telegram_id: telegramUser.id,
        username: telegramUser.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        age: Number(formData.age),
      });

      console.log("Create user response:", data);
      router.push("/creating-profile");
    } catch (error) {
      console.error("Create user error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <div className={styles["profile-setup"]}>
          <header className={styles["profile-setup__header"]}>
            <h1 className={styles["profile-setup__header-title"]}>
              Profile Setup
            </h1>
          </header>

          {/* Main Content */}
          <section className={styles["profile-setup__content"]}>
            <div className={styles["profile-setup__intro"]}>
              <h2 className={styles["profile-setup__title"]}>
                Let's get to know you
              </h2>

              <p className={styles["profile-setup__description"]}>
                Complete your profile to get started.
              </p>
            </div>

            <form
              className={styles["profile-setup__form"]}
              onSubmit={handleSubmit}
            >
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
                  value={formData.firstName}
                  onChange={handleChange}
                  required
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
                  value={formData.lastName}
                  onChange={handleChange}
                  required
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
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <p className={styles["profile-setup__error"]}>{error}</p>
              )}

              <div className={styles["profile-setup__illustration"]}>
                <img
                  className={styles["profile-setup__illustration-image"]}
                  src="/images/Decorative Area.jpg"
                  alt="Profile setup"
                />
              </div>

              <div className={styles["profile-setup__holderspace"]}></div>

              <div className={styles["profile-setup__actions"]}>
                <div className={styles["profile-setup__actions-inner"]}>
                  <button
                    type="submit"
                    className={styles["profile-setup__button--primary"]}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Continue"}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
