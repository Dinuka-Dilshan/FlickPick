import { useCallback, useEffect, useState } from "react";

const useVisible = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.9 }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
        observer.disconnect();
      }
    };
  }, [element]);

  return { isVisible, ref };
};

export default useVisible;
