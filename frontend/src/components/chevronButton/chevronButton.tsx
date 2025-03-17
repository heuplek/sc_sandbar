import Forward from "../../assets/forward.svg";
import Back from "../../assets/back.svg";
import './chevronButton.css'

type ChevronButtonProps = {
    direction: string;
    borderRadiusSide: string;
    clickFunction: () => void;

}

const ChevronButton = ({ direction, clickFunction, borderRadiusSide }: ChevronButtonProps) => {
    return (
        <button
            className={`chevy-button border-${borderRadiusSide}`}
            onClick={clickFunction}>
                <img src={direction == "left" ? Back : Forward} alt="close drawer" />
        </button>
    );
};

export default ChevronButton;