import './Select.css'

type SelectProps = {
    value: number;
    setValue: (value: number) => void;
    frame: string;
};

const Select = ({ value, setValue }: SelectProps) => {
    return (
        <div className="select-wrapper">
            <label>
                Preferred low tide:
                <select className='select' onChange={(e) => setValue(Number(e.target.value))} value={value}>
                    <option value={11}>11:00 AM</option>
                    <option value={11.5}>11:30 AM</option>
                    <option value={12}>12:00 PM</option>
                    <option value={12.5}>12:30 PM</option>
                    <option value={13}>1:00 PM</option>
                    <option value={13.5}>1:30 PM</option>
                    <option value={14}>2:00 PM</option>
                    <option value={14.5}>2:30 PM</option>
                    <option value={15}>3:00 PM</option>
                    <option value={15.5}>3:30 PM</option>
                    <option value={16}>4:00 PM</option>
                    <option value={16.5}>4:30 PM</option>
                    <option value={17}>5:00 PM</option>
                    <option value={17.5}>5:30 PM</option>
                    <option value={18}>6:00 PM</option>
                    <option value={18.5}>6:30 PM</option>
                    <option value={19}>7:00 PM</option>
                    <option value={19.5}>7:30 PM</option>
                </select>
            </label>
        </div>
    );
};

export default Select;