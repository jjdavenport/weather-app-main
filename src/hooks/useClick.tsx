import { useEffect, type RefObject, type SetStateAction } from "react";

const useClick = ({
  open,
  setOpen,
  ref,
}: {
  open: boolean;
  setMenu: React.Dispatch<SetStateAction<boolean>>;
  ref: RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, setOpen, ref]);
};

export default useClick;
