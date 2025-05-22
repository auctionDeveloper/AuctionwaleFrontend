import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.window.scrollTo(0, 0);
 // Optional: "auto" if you don't want smooth
  }, [pathname]);

  return null;
};

export default ScrollToTop;
