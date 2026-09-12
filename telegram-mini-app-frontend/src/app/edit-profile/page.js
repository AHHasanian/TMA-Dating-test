"use client";

import { useEffect, useState } from "react";
import styles from "./editprofile.module.css";
import Headercomponent from "@/components/header/header";
import { useAuth } from "@/context/AuthContext";

export default function EditProfile() {
  const { user, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [sexualOrientation, setSexualOrientation] = useState("");
  const [photoUrl, setPhotoUrl] = useState("/icons/account.svg");

  // Load user data from AuthContext
  useEffect(() => {
    if (!user) return;

    setUsername(user.tma_username || "");
    setFirstName(user.tma_first_name || "");
    setLastName(user.tma_last_name || "");
    setAge(user.tma_age?.toString() || "");
    setGender(user.tma_gender || "");
    setSexualOrientation(user.tma_sexual_orientation || "");
    setPhotoUrl(user.tma_photo_url || "/icons/account.svg");
  }, [user]);

  if (loading) {
    return null;
  }

  return (
    <main>
      <div className="container">
        <Headercomponent title="Edit Profile" showBack rightIcon />

        <section className={styles.profilePhotoSection}>
          <div className={styles.profilePhotoWrapper}>
            <img src={photoUrl} alt="Profile" className={styles.profilePhoto} />

            <button type="button" className={styles.cameraButton}>
              <svg className={styles.cameraButto__edite}>
                <use href="/icons/camera.svg" />
              </svg>
            </button>
          </div>

          <button type="button" className={styles.changePhotoButton}>
            <span className={styles.changePhotoButton__text}>
              Change Profile Photo
            </span>

            <svg className={styles.changePhotoButton__edite}>
              <use href="/icons/note.svg" />
            </svg>
          </button>

          <p className={styles.photoDescription}>
            Visible to potential matches
          </p>
        </section>

        <section className={styles.info}>
          <form>
            {/* Basic Info */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleWrapper}>
                  <svg className={styles.cardTitle__icon}>
                    <use href="/icons/Basic Info.svg" />
                  </svg>

                  <h2 className={styles.cardTitle__text}>Basic Info</h2>
                </div>

                <span className={styles.verifiedBadge}>Verified</span>
              </div>

              <div className={styles.divider}></div>

              {/* Username */}
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="usernameInput">
                  Username
                </label>

                <div
                  className={`${styles.inputWrapper} ${styles.focusWrapper}`}
                >
                  <span className={styles.usernameIcon}>@</span>

                  <input
                    type="text"
                    id="usernameInput"
                    placeholder="e.g. alex_123"
                    className={styles.input}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
              </div>

              {/* First Name */}
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="firstNameInput">
                  First Name
                </label>

                <div
                  className={`${styles.inputWrapper} ${styles.focusWrapper}`}
                >
                  <input
                    type="text"
                    id="firstNameInput"
                    placeholder="e.g. Alex"
                    className={styles.input}
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="lastNameInput">
                  Last Name
                </label>

                <div
                  className={`${styles.inputWrapper} ${styles.focusWrapper}`}
                >
                  <input
                    type="text"
                    id="lastNameInput"
                    placeholder="e.g. Smith"
                    className={styles.input}
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
              </div>

              {/* Age */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Age</label>

                <div className={styles.ageWrapper}>
                  <span className={styles.ageDescription}>Years young</span>

                  <div className={styles.ageControls}>
                    <button
                      type="button"
                      className={styles.ageButton}
                      aria-label="Decrease age"
                      onClick={() => {
                        setAge((currentAge) => {
                          if (currentAge === "") return "1";

                          const newAge = Number(currentAge) - 1;

                          return newAge >= 1 ? newAge.toString() : "1";
                        });
                      }}
                    >
                      −
                    </button>

                    <span
                      className={`${styles.ageValue} ${
                        !age ? styles.agePlaceholder : ""
                      }`}
                    >
                      {age || "e.g. 18"}
                    </span>

                    <button
                      type="button"
                      className={styles.ageButton}
                      aria-label="Increase age"
                      onClick={() => {
                        setAge((currentAge) => {
                          if (currentAge === "") return "1";

                          const newAge = Number(currentAge) + 1;

                          return newAge <= 100 ? newAge.toString() : "100";
                        });
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Identity */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleWrapper}>
                  <svg className={styles.cardTitle__icon}>
                    <use href="/icons/heart.svg" />
                  </svg>

                  <h2 className={styles.cardTitle__text}>Match Identity</h2>
                </div>
              </div>

              <div className={styles.divider}></div>

              {/* Gender */}
              <div className={styles.identityHeader}>
                <label className={styles.identityHeader__label}>Gender</label>

                <span className={styles.identityHeader__displayLabel}>
                  Display on profile
                </span>
              </div>

              <div className={styles.optionsGrid}>
                {["Male", "Female", "Non-binary"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.optionButton} ${
                      gender === option ? styles.optionButtonActive : ""
                    }`}
                    onClick={() => setGender(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Sexual Orientation */}
              <div className={styles.identityHeader}>
                <label className={styles.identityHeader__label}>
                  Sexual Orientation
                </label>
              </div>

              <div className={styles.optionsGrid}>
                {["Straight", "Gay", "Bisexual", "Other"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.optionButton} ${
                      sexualOrientation === option
                        ? styles.optionButtonActive
                        : ""
                    }`}
                    onClick={() => setSexualOrientation(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Bio - فعلاً دست نخورده نگه داشته شده */}
              <div className={styles.bioGroup}>
                <div className={styles.identityHeader}>
                  <label className={styles.identityHeader__label}>Bio</label>

                  <span className={styles.identityHeader__displayLabel}>
                    112/300
                  </span>
                </div>

                <textarea
                  className={styles.bioInput}
                  maxLength={300}
                  rows={4}
                  placeholder="Tech enthusiast & coffee lover. Looking for genuine conversations and exploring new brunch spots in town. ☕✨"
                />
              </div>
            </div>

            <div className={styles.bottomSpace}></div>

            {/* Save */}
            <div className={styles.saveContainer}>
              <div className={styles.saveButton__Container}>
                <button type="button" className={styles.saveButton}>
                  <svg className={styles.saveButton__icon}>
                    <use href="/icons/save.svg" />
                  </svg>

                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
