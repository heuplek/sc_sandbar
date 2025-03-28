import Forward from "../../assets/forward.svg";
import Back from "../../assets/back.svg";
import './chevronButton.css'

type ChevronButtonProps = {
    direction: string;
    borderRadiusSide: string;
    clickFunction: () => void;
    small?: boolean;
}

const ChevronButton = ({ direction, clickFunction, borderRadiusSide, small }: ChevronButtonProps) => {
    return (
        <button
            className={`chevy-button border-${borderRadiusSide}`}
            onClick={clickFunction}>
            <img src={direction == "left" ? Back : Forward} alt="close drawer" height={small ? "10px" : undefined} />
        </button>
    );
};

export default ChevronButton;