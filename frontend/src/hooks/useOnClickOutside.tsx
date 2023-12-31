import { Dispatch, SetStateAction, useEffect, RefObject } from "react";

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: Dispatch<SetStateAction<boolean>>) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(!!event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
