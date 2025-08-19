import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
export default function Modal({children, open, onClose=()=>{}, persistent=false, className, ...props}){
  const modalRef = useRef();
  useEffect(()=> {
    const modal = modalRef.current;
    if(open && !modal.open){
      modal.showModal();
    }
    return ()=> modal.close();
  }, [open]);
  useEffect(() => {
    if (!persistent) return;
    const modal = modalRef.current;
    if (!modal) return;
    const preventClose = (event) => event.preventDefault();
    modal.addEventListener("cancel", preventClose); // Esc
    modal.addEventListener("close", preventClose);  // backdrop
    return () => {
      modal.removeEventListener("cancel", preventClose);
      modal.removeEventListener("close", preventClose);
    };
  }, [persistent]);
  return(
    <>
      {createPortal(
        <dialog onClose={onClose} open={open} ref={modalRef} className={className} {...props}>
          {children}
        </dialog>, 
        document.getElementById("modal")
      )}
    </>
  )
}