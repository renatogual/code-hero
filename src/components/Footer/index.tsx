import { ReactElement } from "react";

import styles from "./styles.module.scss";

interface FooterProps {
  children: ReactElement;
}

export function Footer({ children }: FooterProps) {
  return <footer className={styles.container}>{children}</footer>;
}
