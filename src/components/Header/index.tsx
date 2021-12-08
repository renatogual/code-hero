import logo from "../../assets/images/logo.png";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.container}>
      <img src={logo} alt="logo" width={148} height={48} />
      <div>
        <span>Renato Gualberto</span>
        Teste de Frontend
      </div>
    </header>
  );
}
