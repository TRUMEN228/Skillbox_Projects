import { useEffect, useState } from "react"

const useMaxWidthQuery = (maxWidth: number) => {
  const query = `(max-width: ${maxWidth}px)`;
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = () => {
      setMatches(mediaQueryList.matches);
    }

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    }
  }, [query]);

  return matches;
}

export default useMaxWidthQuery;