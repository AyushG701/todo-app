import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({ children, handleModalClose, handleModalSubmit }) => {
  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      handleModalClose()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-50">
      <div
        onClick={handleModalClose}
        className="absolute top-0 left-0 w-full h-screen
        bg-bodyColor bg-opacity-80"
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2
        -translate-y-1/2 p-12 bg-bodyColor border border-red-500 rounded-md
        z-50 flex flex-col gap-4 shadow-todoShadow"
      >
        <span
          onClick={handleModalClose}
          className="absolute top-[10px] right-[11px] z-10 text-white
          text-xl cursor-pointer"
        >
          <AiOutlineClose />
        </span>
        {children}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleModalSubmit}
            type="button"
            className="px-6 py-2 text-base font-titleFont text-orange-500
            hover:text-red-500 font-semibold bg-transparent border
            border-gray-500 hover:border-red-500 duration-300"
          >
            Yes
          </button>
          <button
            onClick={handleModalClose}
            type="button"
            className="px-6 py-2 text-base font-titleFont text-green-500
            hover:text-green-500 font-semibold bg-transparent border
            border-gray-500 hover:border-green-500 duration-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
