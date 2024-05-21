import { useEffect } from "react";

export function useKeyDown(keyDownHandler: (event: KeyboardEvent) => void) {
  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [keyDownHandler]);

  //   function keyDownHandler(event: KeyboardEvent) {
  //     if (event.ctrlKey && event.key === "k") {
  //       console.log("You just pressed Control and K!");
  //     }
  //   }
}
