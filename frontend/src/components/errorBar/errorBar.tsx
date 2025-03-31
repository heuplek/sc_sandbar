import { useCalendarContext } from '../../context/calendarContext'
import './errorBar.css'

const ErrorBar = () => {
    const { errorObj } = useCalendarContext()
    return (
        errorObj &&
        <div className="error-wrapper">
            <span className='error-text'>{errorObj}</span>
        </div>
    )
}

export default ErrorBar