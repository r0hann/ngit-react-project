import React, { useRef, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}
const SnapScrollContainer: React.FC<Props> = ({children}) => {
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false); // Lock to manage scroll completion
  const [startTouch, setStartTouch] = useState<number | null>(null);
  const cardHeight = 330; 

  // Scrolls smoothly to the card that is currently in focus
  const scrollToFocusedCard = (newIndex: number) => {
    if (scrollContainerRef.current) {
      const scrollPosition = newIndex * cardHeight ;

      scrollContainerRef.current.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const updateFocusedCard = (direction: number) => {
    if (isScrolling) return; // Prevent updates if already scrolling
    setIsScrolling(true); 

    const newIndex = Math.min(Math.max(0, focusedIndex + direction), 9); // Assuming there are 10 cards
    setFocusedIndex(newIndex);

    setTimeout(() => setIsScrolling(false), 400);
  };

  useEffect(() => {
    scrollToFocusedCard(focusedIndex); // Ensure smooth scrolling when focusedIndex changes
  }, [focusedIndex]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      updateFocusedCard(direction);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        updateFocusedCard(direction);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touchStartY = event.touches[0].clientY;
      setStartTouch(touchStartY);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (startTouch !== null) {
        const touchEndY = event.changedTouches[0].clientY;
        const direction = touchEndY < startTouch ? 1 : -1;
        updateFocusedCard(direction);
        setStartTouch(null); // Reset touch start position
      }
    };

    // Use the container and attach event listeners for wheel and touch events
    const container = scrollContainerRef.current;
    if (container) {
      // Attach the wheel event listener with passive set to false
      container.addEventListener("wheel", handleWheel, { passive: false });
      // For touch events, they can remain passive
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    }
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listeners
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex, startTouch, isScrolling]);

  return (
    <div className="scroll-container" ref={scrollContainerRef}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement<any>, {
          key: index,
          index: index,
          focusedIndex: focusedIndex,
        })
      )}
    </div>
  );
};

export default SnapScrollContainer;
