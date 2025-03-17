import FullStar from "../../assets/vscode-codicon_star-full.svg";
import EmptyStar from "../../assets/vscode-codicon_star-empty.svg";
import HalfStar from "../../assets/vscode-codicon_star-half.svg";
import "./starPanel.css";


type StarPanelProps = {
    numStars: number;
    large?: boolean;
}

const StarPanel = ({ numStars, large }: StarPanelProps) => {
    return (
        <div className="star-panel">
            {Array.from({ length: 5 }, (_, i) => {
                if (numStars >= i + 1) {
                    return <img src={FullStar} alt="full star" className="full" key={i} height={large ? "32px" : "16px"} />
                } else if (numStars > i) {
                    return <img src={HalfStar} alt="half star" key={i} height={large ? "32px" : "16px"} />
                } else {
                    return <img src={EmptyStar} alt="empty star" key={i} height={large ? "32px" : "16px"} />
                }
            })}
        </div>
    )
}

export default StarPanel;