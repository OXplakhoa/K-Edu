import { useCallback, useEffect, useRef } from "react";

interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
  CloseOnClickOutside?: boolean;
  CloseOnEscape?: boolean;
  preventBodyScroll?: boolean;
}

export const useModal = ({
  isOpen,
  onClose,
  CloseOnClickOutside = true,
  CloseOnEscape = true,
  preventBodyScroll = true,
}: UseModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        CloseOnClickOutside &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose, CloseOnClickOutside]
  );
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (CloseOnEscape && event.key === "Escape") {
        onClose();
      }
    },
    [onClose, CloseOnEscape]
  );
  //UseEffect to handle body scroll
  useEffect(() => {
    if (isOpen) {
      if (CloseOnClickOutside) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      if (CloseOnEscape) {
        document.addEventListener("keydown", handleEscapeKey);
      }
      if (preventBodyScroll) {
        document.body.style.overflow = "hidden";
      }
    }
    //CleanUp Function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      if (preventBodyScroll) {
        document.body.style.overflow = "";
      }
    };
  }, [
    isOpen,
    CloseOnClickOutside,
    CloseOnEscape,
    preventBodyScroll,
    handleClickOutside,
    handleEscapeKey,
  ]);
  return { modalRef };
};
