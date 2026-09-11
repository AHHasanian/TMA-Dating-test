"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import styles from "./SwipeCard.module.css";

const SWIPE_THRESHOLD = 120;
const MAX_STACK_DEPTH = 2;

export function SwipeCard({ profile, isTop, stackIndex, onSwipe }) {
  const [exitDirection, setExitDirection] = useState(null);
  const [justLiked, setJustLiked] = useState(false);

  const x = useMotionValue(0);

  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);

  const likeStampOpacity = useTransform(x, [20, 120], [0, 1]);

  const passStampOpacity = useTransform(x, [-120, -20], [1, 0]);

  const depth = Math.min(stackIndex, MAX_STACK_DEPTH);

  const triggerSwipe = (direction) => {
    if (exitDirection) return;

    setExitDirection(direction);

    if (direction === "right") {
      setJustLiked(true);

      window.setTimeout(() => {
        onSwipe(direction);
      }, 380);
    } else {
      window.setTimeout(() => {
        onSwipe(direction);
      }, 250);
    }
  };

  const handleDragEnd = (_event, info) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      triggerSwipe("right");
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      triggerSwipe("left");
    }
  };

  return (
    <motion.div
      className={styles.cardWrapper}
      style={{
        zIndex: isTop ? 3 : stackIndex === 1 ? 2 : 1,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      dragElastic={1}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={false}
      animate={
        exitDirection
          ? {
              x: exitDirection === "right" ? 500 : -500,
              rotate: exitDirection === "right" ? 25 : -25,
              opacity: 0,
              transition: {
                duration: 0.35,
                ease: "easeOut",
              },
            }
          : {
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }
      }
      whileDrag={{
        cursor: "grabbing",
      }}
    >
      <div
        className={
          stackIndex === 0
            ? styles.cardTop
            : stackIndex === 1
              ? styles.cardBack1
              : styles.cardBack2
        }
      >
        <div className={styles.card}>
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className={styles.profileImage}
            draggable={false}
          />

          <div className={styles.imageOverlay} />

          {/* Compatibility */}
          <div className={styles.compatibilityBadge}>
            <span className={styles.compatibilityIcon}>
              <svg className={styles.powerIcon}>
                <use href="/icons/power.svg" />
              </svg>
            </span>

            <span className={styles.compatibilityText}>
              {profile.compatibility}% Compatibility
            </span>
          </div>

          {/* NEW */}
          {profile.isNew && <div className={styles.newBadge}>NEW</div>}

          {/* Heart animation */}
          {justLiked && (
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1.4, 1],
                opacity: [0, 1, 0.9],
              }}
              transition={{
                duration: 0.4,
              }}
              className={styles.heartFeedback}
            >
              <svg className={styles.bigHeart}>
                <use href="/icons/heart.svg" />
              </svg>
            </motion.div>
          )}

          {/* Profile information */}
          <div className={styles.profileInfo}>
            <div className={styles.profileHeader}>
              <div className={styles.nameWrapper}>
                <div className={styles.profileDetiles}>
                  <h3 className={styles.profileName}>
                    {profile.name}, {profile.age}
                  </h3>

                  {profile.verified && (
                    <svg className={styles.verifiedIcon}>
                      <use href="/icons/BadgeCheck.svg" />
                    </svg>
                  )}
                </div>

                {/* Distance / occupation */}
                {(profile.distanceKm !== undefined || profile.occupation) && (
                  <div className={styles.metaInfo}>
                    {profile.distanceKm !== undefined && (
                      <span className={styles.distance}>
                        <svg className={styles.mapIcon}>
                          <use href="/icons/navigation.svg" />
                        </svg>
                        {profile.distanceKm} km away
                      </span>
                    )}

                    {profile.occupation && <span>· {profile.occupation}</span>}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className={styles.actionButtons}>
                <button
                  type="button"
                  aria-label="Pass"
                  disabled={!isTop}
                  onClick={() => triggerSwipe("left")}
                  className={`${styles.actionButton} ${styles.passButton}`}
                >
                  <svg className={styles.buttonIcon}>
                    <use href="/icons/close.svg" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Like"
                  disabled={!isTop}
                  onClick={() => triggerSwipe("right")}
                  className={`${styles.actionButton} ${styles.likeButton} ${
                    justLiked ? styles.likeButtonActive : ""
                  }`}
                >
                  <svg className={styles.buttonIcon}>
                    <use href="/icons/heart.svg" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && <p className={styles.bio}>{profile.bio}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
