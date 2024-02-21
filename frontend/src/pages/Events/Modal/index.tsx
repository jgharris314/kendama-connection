import React from "react"
import CreateEventForm from "./CreateForm"

export default function Modal({
  isCreateMode,
  setIsOpen,
}: {
  isCreateMode: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div
      id="modal-container"
      className="fixed inset-0 w-full h-full z-50 invisible"
    >
      <div
        id="modal-bg"
        className=" absolute inset-0 w-full h-full bg-gray-900 opacity-0 duration-500 ease-out transition-all"
      />
      <div
        id="modal"
        className="absolute w-full lg:w-[66vw] xl:w-[50vw] h-full bg-green-900 right-0 top-0 translate-y-full lg:translate-x-full lg:translate-y-0 duration-500 ease-out transition-all"
      >
        <button
          className="w-12 h-12 bg-red-700 text-red font-black text-kenConnect-white"
          onClick={() => setIsOpen(false)}
        >
          -&gt;
        </button>
        <CreateEventForm />
      </div>
    </div>
  )
}
