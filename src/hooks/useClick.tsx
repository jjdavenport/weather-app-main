import { useEffect, type RefObject, type SetStateAction } from "react";

const useClick = ({
  open,
  setOpen,
  menuRef,
  buttonRef,
}: {
  open: boolean;
  setMenu: (e: React.Dispatch<SetStateAction<boolean>>) => void;
  menuRef: RefObject<HTMLDivElement>;
  buttonRef: RefObject<HTMLButtonElement>;
}) => {
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, setOpen, menuRef, buttonRef]);
};

export default useClick;
