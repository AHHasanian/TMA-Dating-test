"use client";

import { useEffect, useState } from "react";
import { SwipeCard } from "./SwipeCard";
import styles from "./MatchSuggestions.module.css";

import { getMatchSuggestions, likeMatch, dislikeMatch } from "@/services/api";

const VISIBLE_STACK = 3;

export function MatchSuggestions({
  telegramId,
  onEmpty,
  onExploreMore,
  className = "",
}) {
  const [deck, setDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMatches = async () => {
      if (!telegramId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getMatchSuggestions(telegramId);

        const mappedProfiles = data.matches.map((user) => ({
          id: user.telegram_id,
          name: user.tma_first_name,
          age: user.tma_age,
          photoUrl: user.tma_photo_url,
          username: user.tma_username,
          gender: user.tma_gender,
          sexualOrientation: user.tma_sexual_orientation,

          // فعلاً Backend این اطلاعات را ارسال نمی‌کند
          compatibility: null,
          verified: false,
          isNew: false,
          distanceKm: undefined,
          occupation: undefined,
          bio: undefined,
        }));

        setDeck(mappedProfiles);
      } catch (error) {
        console.error("Failed to load matches:", error);
        setError("Unable to load suggestions");
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [telegramId]);

  const handleSwipe = async (direction) => {
    const current = deck[0];

    if (!current || !telegramId) {
      return;
    }

    // فعلاً کارت را از UI حذف می‌کنیم
    setDeck((prev) => prev.slice(1));

    try {
      if (direction === "right") {
        await likeMatch(telegramId, current.id);
      } else {
        await dislikeMatch(telegramId, current.id);
      }
    } catch (error) {
      console.error("Failed to save interaction:", error);

      // اگر Backend خطا داد،
      // کارت را دوباره به ابتدای Deck برمی‌گردانیم.
      setDeck((prev) => [current, ...prev]);
    }
  };

  useEffect(() => {
    if (!loading && !error && deck.length === 0) {
      onEmpty?.();
    }
  }, [deck.length, loading, error, onEmpty]);

  return (
    <section className={`${styles.section} ${className}`}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.header__container}>
          <svg className={styles.header__icon}>
            <use href="/icons/hot.svg" />
          </svg>

          <h2 className={styles.header__text}>Today's Suggestions</h2>
        </div>

        <div className={styles.header__profile}>
          <span className={styles.header__profietext}>
            {deck.length} profiles
          </span>
        </div>
      </header>

      {/* Loading */}
      {loading && (
        <div className={styles.container}>
          <div className={`${styles.loadingCard} ${styles.cardBack2}`} />

          <div className={`${styles.loadingCard} ${styles.cardBack1}`} />

          <div className={styles.loadingCard}>
            <div className={styles.loadingInfo}>
              <div
                className={`${styles.loadingLine} ${styles.loadingLineLarge}`}
              />

              <div
                className={`${styles.loadingLine} ${styles.loadingLineMedium}`}
              />

              <div
                className={`${styles.loadingLine} ${styles.loadingLineSmall}`}
              />
            </div>

            <div className={styles.loadingButtons}>
              <div className={styles.loadingButton} />
              <div className={styles.loadingButton} />
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>⚠️</div>

          <h3 className={styles.emptyTitle}>Something went wrong</h3>

          <p className={styles.emptyDescription}>{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && deck.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💔</div>

          <h3 className={styles.emptyTitle}>No more matches for now</h3>

          <p className={styles.emptyDescription}>
            We&apos;ll notify you when new recommendations are available.
          </p>

          <button
            type="button"
            onClick={onExploreMore}
            className={styles.exploreButton}
          >
            Explore More
          </button>
        </div>
      )}

      {/* Cards */}
      {!loading && !error && deck.length > 0 && (
        <div className={styles.container}>
          {[...deck.slice(0, VISIBLE_STACK)].reverse().map((profile, i) => {
            const visible = deck.slice(0, VISIBLE_STACK);
            const stackIndex = visible.length - 1 - i;

            return (
              <SwipeCard
                key={profile.id}
                profile={profile}
                isTop={stackIndex === 0}
                stackIndex={stackIndex}
                onSwipe={handleSwipe}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
