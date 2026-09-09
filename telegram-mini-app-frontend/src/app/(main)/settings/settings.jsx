"use client";

import styles from "./settings.module.css";

import Headercomponent from "@/components/header/header";
import Cardprofile from "@/components/cardProfile/cardProfile";
import SettingsListItem from "@/components/SettingsListItem/SettingsListItem";

export default function SettingsPage() {
  return (
    <main className={styles.main_container}>
      <div className="container">
        <Headercomponent title="Settings" rightIcon />
        <section className={styles.space}>
          <Cardprofile />
        </section>
        <section>
          <h2 className={styles.ListItem__title}>Account</h2>
          <div className={styles.ListItem__card}>
            <SettingsListItem
              title="Edit Profile"
              href=" "
              icon="/icons/account-normal.svg"
              subtitle="Name, age, phone number"
            />
          </div>
        </section>
        <section>
          <h2 className={styles.ListItem__title}>App Preferences</h2>
          <div className={styles.ListItem__card}>
            <SettingsListItem
              title="Language"
              href=" "
              icon="/icons/Language.svg"
              rightText="English"
            />
            <SettingsListItem
              title="Appearance"
              href=" "
              icon="/icons/Appearance.svg"
              rightText="System default"
            />
          </div>
        </section>
        <section>
          <h2 className={styles.ListItem__title}>Privacy & Security</h2>
          <div className={styles.ListItem__card}>
            <SettingsListItem
              title="Privacy"
              href=" "
              icon="/icons/Privacy.svg"
            />
            <SettingsListItem
              title="Blocked Users"
              href=" "
              icon="/icons/Blocked Users.svg"
              rightText="0 users"
            />
          </div>
        </section>
        <section>
          <h2 className={styles.ListItem__title}>Other</h2>
          <div className={styles.ListItem__card}>
            <SettingsListItem
              title="Help & Support"
              href=" "
              icon="/icons/Help & Support.svg"
            />
            <SettingsListItem
              title="About"
              href=" "
              icon="/icons/About.svg"
              rightText="v1.0.0 POC"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
