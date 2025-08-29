import { useState, useEffect, MutableRefObject } from "react";
import { Button } from "@material-tailwind/react";

type ScrollToTopButtonProps = {
  scrollRef: MutableRefObject<HTMLElement | null>;
};

export default function ScrollToTopButton({ scrollRef }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = scrollRef.current;

    const handleScroll = () => {
      if (target && target.scrollTop > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (target) {
      target.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (target) {
        target.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef]);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
    	
    	<div>
    	{/*//@ts-ignore*/}
      <Button      
        onClick={scrollToTop}
        className="rounded-full p-2"
        color="blue"
      >
        ↑ Subir
      </Button>
      </div>
    )
  );
}
