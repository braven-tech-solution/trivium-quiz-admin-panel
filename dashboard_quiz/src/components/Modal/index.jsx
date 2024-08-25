import crossSvg from "../../assets/icons/cross.svg";

const Modal = ({ title, setModal, width, body }) => {
  const styles = {
    modalWrapper:
      "fixed flex items-center   justify-center top-0 right-0 left-0 bottom-0 backdrop-blur-sm bg-opacity-10 z-[700]",
    modalCloseButton:
      "my-0 mx-0 bg-none hover:opacity-80 focus:opacity-80 active:opacity-80 text-black text-[16px] w-[130px] py-2 px-3 rounded-md flex justify-center items-center",
    modalButton:
      "my-0 mx-0 bg-brand hover:bg-brand hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-white text-[16px] w-[130px] py-2 px-3 rounded-md flex justify-center items-center",
  };
  return (
    <div className={`${styles.modalWrapper} bg-black `}>
      <div
        className={`bg-[#CCBFB0] max-h-[750px] overflow-y-auto relative px-2 pt-2 rounded-md ${
          width ? width : "w-[50%]"
        }`}
      >
        {/* {title && ( */}
        <div className="text-[12px]  cursor-pointer flex min-h-6">
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        {/* )} */}

        <div
          className="text-[14px]  text-black absolute right-2  top-0  pt-2     cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            setModal(false);
          }}
        >
          <img src={crossSvg} alt="" className="" />
        </div>

        <div className="bg-white text-black px-1">
          <div className="my-3 p-1">{body}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
