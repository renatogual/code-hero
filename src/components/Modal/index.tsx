import { ReactElement } from "react";
import { MdClose } from "react-icons/md";

import styles from "./styles.module.scss";

interface ModalProps {
  showModal: boolean;
  onCloseModal: (param: boolean) => void;
  children: ReactElement;
  loading?: boolean;
}

export function Modal({
  showModal,
  onCloseModal,
  children,
  loading = false,
}: ModalProps) {
  const handleCloseModal = () => {
    onCloseModal(false);
  };

  return (
    <>
      {showModal && (
        <div className={styles.container}>
          {loading ? (
            children
          ) : (
            <div className={styles.content}>
              <button
                type="button"
                className={styles.close}
                onClick={handleCloseModal}
              >
                <MdClose size={22} />
              </button>
              {children}
            </div>
          )}
        </div>
      )}
    </>
  );
}
