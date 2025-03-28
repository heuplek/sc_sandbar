import { ReactNode, useState } from "react";
import { useCalendarContext } from "../../context/calendarContext";
import "./card.css";

type CardProps = {
  calendarCard?: boolean;
  children: ReactNode;
  isMobile?: boolean;
};

const Card = ({ children, calendarCard, isMobile }: CardProps) => {
  const { day, setDay } = useCalendarContext();
  const [touchStart, setTouchStart] = useState<number | undefined>(0);
  const [touchEnd, setTouchEnd] = useState<number | undefined>(0);

  const minSwipe = 75;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(undefined);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    if (touchStart - touchEnd > minSwipe) {
      setDay(day + 1);
    }
    if (touchStart - touchEnd < -minSwipe) {
      setDay(day - 1);
    }
  };

  return isMobile ?
    (
      <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className={`card-wrapper ${calendarCard ? "calendar-card" : ""} `}>
          <div className="card-text-wrapper">
            {children}
          </div>
        </div>
      </div>
    )
    : (
      <div className={`card-wrapper ${calendarCard ? "calendar-card" : ""} `}>
        <div className="card-text-wrapper">
          {children}
        </div>
      </div>
    );
};

export default Card;