import styles from "./editprofile.module.css";
import Headercomponent from "@/components/header/header";

export default function EditProfile() {
  return (
    <main>
      <div className="container">
        <Headercomponent title="Edit Profile" showBack rightIcon />
        <section className={styles.profilePhotoSection}>
          <div className={styles.profilePhotoWrapper}>
            <svg className={styles.profilePhoto}>
              <use href="/icons/account.svg" />
            </svg>
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
          <from>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleWrapper}>
                  <svg className={styles.cardTitle__icon}>
                    <use href="/icons/Basic Info.svg" />
                  </svg>
                  <h2>Basic Info</h2>
                </div>
                <span className={styles.verifiedBadge}>Verified</span>
              </div>
            </div>
            <div className={styles.card}></div>
          </from>
        </section>
      </div>
    </main>
  );
}
