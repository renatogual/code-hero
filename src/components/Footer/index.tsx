import { ReactNode } from "react";

import styles from "./styles.module.scss";

interface FooterProps {
  children: ReactNode;
}

export function Footer({ children }: FooterProps) {
  return <footer className={styles.container}>{children}</footer>;
}
