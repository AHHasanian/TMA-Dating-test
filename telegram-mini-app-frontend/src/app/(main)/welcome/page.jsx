"use client";

import styles from "./Welcome.module.css";
import { useAuth } from "@/context/AuthContext";
import Cardprofile from "@/components/cardProfile/cardProfile";

import { MatchSuggestions } from "@/components/MatchSuggestions/MatchSuggestions";
import mockProfiles from "@/data/mockProfiles";

export default function Welcome() {
  const { user, loading } = useAuth();
  return (
    <main className={styles.main_container}>
      <div className="container">
        <header className={styles["profile-setup__header"]}>
          <h1 className={styles["profile-setup__header-title"]}>Welcome</h1>
        </header>
        {/* title */}
        <div className={styles["welcome__title"]}>
          <h1 className={styles["welcome__title-text"]}>
            Welcome back, {user?.tma_first_name || "Human"} 👋
          </h1>
          <p className={styles["welcome__title-description"]}>
            Here is a quick look at your profile status.
          </p>
        </div>
        {/* Main Content */}
        <Cardprofile />
        <MatchSuggestions
          telegramId="900000001"
          profiles={mockProfiles}
          onLike={(profile) => console.log("liked", profile.id)}
          onPass={(profile) => console.log("passed", profile.id)}
          onEmpty={() => console.log("deck finished")}
          onExploreMore={() => console.log("fetch more profiles")}
        />
      </div>
    </main>
  );
}
