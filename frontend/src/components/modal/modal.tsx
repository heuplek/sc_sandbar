import { useRef } from "react";
 import { useCalendarContext } from "../../context/calendarContext"
 import './modal.css'

const Modal = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const { modalData, modalOpen, setModalOpen } = useCalendarContext();
    return (
        modalOpen && (
        <div className="modal" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (modalRef.current && modalRef.current.contains(e.target as Node)) {
              return;
            }
            setModalOpen(false);
          }}>
            <dialog open className="modal-box" ref={modalRef}>
                <h2>{modalData?.date}</h2>
                <div className="modal-content">
                {modalData?.tides.map((tide, i) => {
                    return (
                        <div key={i}>
                            <p>{tide.type} {tide.time} {tide.height} ft</p>
                        </div>
                    )
                })}
                </div>
            </dialog>
        </div>)
    )
}

export default Modal
