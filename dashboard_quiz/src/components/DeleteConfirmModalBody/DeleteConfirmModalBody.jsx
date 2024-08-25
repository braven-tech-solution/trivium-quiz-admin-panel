import React from "react";

const DeleteConfirmModalBody = ({ title, type, onDeleteItem }) => {
  return (
    <div className="p-4">
      <p className="text-center text-2xl  font-semibold">{`"${title}"`}</p>
      {/* <h1 className="text-center text-2xl text-red-500 pt-2">
        This {type} you want to delete?{" "}
      </h1> */}
      <h1 className="text-center text-2xl text-red-500 pt-2">
        Are you want to delete?{" "}
      </h1>
      <div className="flex justify-end pt-4">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onDeleteItem();
          }}
          className="text-2xl px-2 py-1 font-semibold rounded-md  text-white bg-red-500"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmModalBody;
