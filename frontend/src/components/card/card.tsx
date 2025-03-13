import { ReactNode } from "react";
import "./card.css";

type CardProps = {
    calendarCard?: boolean;
    children: ReactNode;
};

const Card = ({children, calendarCard}:CardProps) => {
  return (
    <div className={`card-wrapper ${calendarCard ? "calendar-card":""} `}>
      <div className="card-text-wrapper">
        {children}
      </div>
    </div>
  );
};

export default Card;