import { useCalendarContext } from '../../context/calendarContext'
import './header.css'

const ErrorBar = () => {
    const { errorObj } = useCalendarContext()
    return (
        errorObj &&
        <div className="header-wrapper">
            <div className='header-text-wrapper'>
                <span className='header-text'>{errorObj}</span>
            </div>
        </div>
    )
}

export default ErrorBar