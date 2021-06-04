/**
 * @description Getting prev state in Hook
 */
import { useRef, useEffect } from "react";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
