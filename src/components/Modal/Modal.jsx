import { IoMdClose } from "react-icons/io";

import "./Modal.css";

export const Modal = ({ children, className, setModalIsShown }) => {
  return (
    <div>
      <div className="modal-bg"></div>
      <div className={`modal ${className}`}>
        <div className="modal-close">
          <IoMdClose
            onClick={() => setModalIsShown(false)}
          />
        </div>
        {children}
      </div>
    </div>
  )
}