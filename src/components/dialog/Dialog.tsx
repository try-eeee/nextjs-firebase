"use client";

import styles from "./Dialog.module.scss";
import { forwardRef, RefObject, useCallback } from "react";

interface DialogProps {
  children: React.ReactNode;
  handleOutside: () => void;
}

export function useDialog(ref: RefObject<HTMLDialogElement>) {
  const showModal = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, [ref]);

  const closeModal = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, [ref]);

  return { ref, showModal, closeModal };
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  function DialogBase(props, ref) {
    const { children, handleOutside } = props;
    return (
      <dialog ref={ref} onClick={handleOutside} className={styles.dialog}>
        <div className={styles.contents} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </dialog>
    );
  }
);
