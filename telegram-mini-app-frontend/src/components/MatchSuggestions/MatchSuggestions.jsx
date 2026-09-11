"use client";

import { useState } from "react";
import { SwipeCard } from "./SwipeCard";
import styles from "./MatchSuggestions.module.css";

const VISIBLE_STACK = 3;

export function MatchSuggestions({
  profiles,
  loading = false,
  onLike,
  onPass,
  onEmpty,
  onExploreMore,
  className = "",
}) {
  const [deck, setDeck] = useState(profiles);

  const handleSwipe = (direction) => {
    setDeck((prev) => {
      const [current, ...rest] = prev;

      if (!current) return prev;

      if (direction === "right") {
        onLike?.(current);
      } else {
        onPass?.(current);
      }

      if (rest.length === 0) {
        onEmpty?.();
      }

      return rest;
    });
  };

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
            {profiles.length} profiles
          </span>
        </div>
      </header>

      {/* Loading */}
      {loading && (
        <div className={styles.container}>
          {/* Card stack */}
          <div className={`${styles.loadingCard} ${styles.cardBack2}`} />
          <div className={`${styles.loadingCard} ${styles.cardBack1}`} />
          <div className={styles.loadingCard}>
            {/* Profile information */}
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

            {/* Action buttons */}
            <div className={styles.loadingButtons}>
              <div className={styles.loadingButton} />
              <div className={styles.loadingButton} />
            </div>
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && deck.length === 0 && (
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
      {!loading && deck.length > 0 && (
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
