import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
const defaultOption = {
  root: null,
  threshold: 0.5,
  rootMargin: "0px",
};
export default function useIntersectionObserver(onIntersect, options) {
  const targetRef = useRef(null);
  const checkIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      onIntersect();
    }
  }, []);

  useEffect(() => {
    let io;
    if (targetRef.current) {
      io = new IntersectionObserver(checkIntersect, {
        ...defaultOption,
        ...options,
      });
      io.observe(targetRef.current);
    }

    return () => {
      io && io.disconnect();
    };
  }, [targetRef]);

  return targetRef;
}
