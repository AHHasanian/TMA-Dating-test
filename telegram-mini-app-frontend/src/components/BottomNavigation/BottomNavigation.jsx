"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./BottomNavigation.module.css";

export default function BottomNavigation() {
  const navigationItems = [
    {
      lable: "Welcome",
      href: "/welcome",
      icon: (
        <svg>
          <use href="/icons/welcome.svg" />
        </svg>
      ),
    },
    {
      lable: "Discovery",
      href: "/discovery",
      icon: (
        <svg>
          <use href="/icons/discovery.svg" />
        </svg>
      ),
    },
    {
      lable: "Profile",
      href: "/profile",
      icon: (
        <svg>
          <use href="/icons/profile.svg" />
        </svg>
      ),
    },
    {
      lable: "Settings",
      href: "/settings",
      icon: (
        <svg>
          <use href="/icons/settings.svg" />
        </svg>
      ),
    },
  ];
  const pathname = usePathname();
  return (
    <nav className={styles.BottomNavigation}>
      <div className={styles.BottomNavigation__items}>
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`${styles.BottomNavigation__item} ${isActive ? styles.active : ""}`}
              >
                <span
                  className={`${styles.item__icon} ${isActive ? styles.active : ""}`}
                >
                  {item.icon}
                </span>
                <span
                  className={`${styles.item__lable} ${isActive ? styles.active : ""}`}
                >
                  {item.lable}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
