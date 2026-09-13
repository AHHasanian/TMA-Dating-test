"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./enteringInformation.module.css";
import { createUser } from "@/services/api";
import useTelegram from "@/hooks/useTelegram";
import { useAuth } from "@/context/AuthContext";

export default function EnteringInformationPage() {
  const router = useRouter();
  const telegram = useTelegram();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
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
    setIsCreatingProfile(true);

    try {
      const telegramUser = telegram?.initDataUnsafe?.user;

      if (!telegramUser?.id) {
        throw new Error("Telegram user information is not available");
      }

      const data = await createUser({
        telegram_id: telegramUser.id,
        telegram_username: telegramUser.username,
        telegram_first_name: telegramUser.first_name,
        telegram_last_name: telegramUser.last_name,
        telegram_photo_url: telegramUser.photo_url,
        telegram_language_code: telegramUser.language_code,

        tma_username: null,
        tma_first_name: formData.firstName.trim(),
        tma_last_name: formData.lastName.trim(),
        tma_photo_url: null,
        tma_age: Number(formData.age),

        tma_gender: null,
        tma_sexual_orientation: null,
      });

      console.log("Create user response:", data);

      if (!data.success) {
        throw new Error(data.message || "Failed to create user");
      }

      setUser(data.user);

      router.push("/creating-profile");
    } catch (error) {
      console.error("Create user error:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setIsCreatingProfile(false);
    }
  };

  const handleGuest = async () => {
    // مرحله اول: ورود به حالت Guest
    if (!isGuestMode) {
      setError("");
      setIsGuestMode(true);
      return;
    }

    // مرحله دوم: ثبت Guest بعد از وارد کردن سن
    setError("");
    setIsGuestLoading(true);

    try {
      const telegramUser = telegram?.initDataUnsafe?.user;

      if (!telegramUser?.id) {
        throw new Error("Telegram user information is not available");
      }

      if (!formData.age) {
        throw new Error("Please enter your age");
      }

      const data = await createUser({
        telegram_id: telegramUser.id,
        telegram_username: telegramUser.username,
        telegram_first_name: telegramUser.first_name,
        telegram_last_name: telegramUser.last_name,
        telegram_photo_url: telegramUser.photo_url,
        telegram_language_code: telegramUser.language_code,

        // Guest values
        tma_username: "guest_user",
        tma_first_name: "Guest",
        tma_last_name: "User",
        tma_photo_url: "/icons/account.svg",
        tma_age: Number(formData.age),

        // These two can be null
        tma_gender: null,
        tma_sexual_orientation: null,
      });

      console.log("Guest user response:", data);

      if (!data.success) {
        throw new Error(data.message || "Failed to create guest user");
      }

      setUser(data.user);

      router.push("/creating-profile");
    } catch (error) {
      console.error("Create guest user error:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setIsGuestLoading(false);
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

          <section className={styles["profile-setup__content"]}>
            <div className={styles["profile-setup__intro"]}>
              <h2 className={styles["profile-setup__title"]}>
                {isGuestMode ? "Tell us your age" : "Let's get to know you"}
              </h2>

              <p className={styles["profile-setup__description"]}>
                {isGuestMode
                  ? "Enter your age to continue as a guest."
                  : "Complete your profile to get started."}
              </p>
            </div>

            <form
              className={styles["profile-setup__form"]}
              onSubmit={handleSubmit}
            >
              {/* First Name */}
              {!isGuestMode && (
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
              )}

              {/* Last Name */}
              {!isGuestMode && (
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
              )}

              {/* Age */}
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
                  {/* Create Profile */}
                  {!isGuestMode && (
                    <button
                      type="submit"
                      className={styles["profile-setup__button--primary"]}
                      disabled={isCreatingProfile || isGuestLoading}
                    >
                      {isCreatingProfile ? "Creating..." : "Create Profile"}
                    </button>
                  )}

                  {/* Guest */}
                  <button
                    type="button"
                    className={styles["profile-setup__button--guest"]}
                    onClick={handleGuest}
                    disabled={isCreatingProfile || isGuestLoading}
                  >
                    {isGuestLoading
                      ? "Creating..."
                      : isGuestMode
                        ? "Continue as Guest"
                        : "Continue as Guest"}
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
