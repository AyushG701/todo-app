/* eslint-disable complexity */
import { deleteSingleTodos } from '../store/todo-slice'
import { useDispatch } from 'react-redux'

import { motion } from 'framer-motion'

import { MdDelete, MdBusinessCenter } from 'react-icons/md'
import { BsFillPersonFill, BsFillCaretDownFill } from 'react-icons/bs'
import { VscEllipsis } from 'react-icons/vsc'

const TodoItem = ({
  todo,
  handleItemClick,
  handleExpandClick,
  isSelected,
  isExpanded,
}) => {
  const dispatch = useDispatch()

  return (
    <motion.li
      // eslint-disable-next-line no-underscore-dangle
      onClick={() => handleItemClick(todo._id)}
      initial={{ 'y': 10, 'opacity': 0 }}
      animate={{ 'y': 0, 'opacity': 1 }}
      transition={{ 'x': -10, 'opacity': 0 }}
      style={
        isSelected ? {
          'borderRightColor': 'rgb(124 45 18)',
          'borderColor': 'rgb(249 115 22)',
        } : { 'borderRightColor': todo.color, 'borderColor': todo.color }
      }
      className="w-full font-titleFont font-medium text-base
      border border-l-[6px] rounded-smpx-2 py-2 cursor-pointer
      flex items-center justify-between flex-wrap"
    >
      <div className="flex items-center">
        <div className={`${todo.important ? 'text-red-500' : 'text-white'}`}>
          {todo.todo}
        </div>
        {todo.category === 'Personal' && (
          <span className="text-md text-gray-400 ml-2">
            <BsFillPersonFill />
          </span>
        )}
        {todo.category === 'Business' && (
          <span className="text-md text-gray-400 ml-2">
            <MdBusinessCenter />
          </span>
        )}
        {todo.category === 'Others' && (
          <span className="text-md text-gray-400 ml-2">
            <VscEllipsis />
          </span>
        )}
      </div>
      <div className="flex justify-center items-center gap-1">
        <span
          onClick={() => handleExpandClick(todo._id)}
          className={`text-xl text-gray-300 hover:text-gray-500 
          duration-300 cursor-pointer ${todo.descr.length === 0 && 'hidden'
            }`}
        >
          <BsFillCaretDownFill />
        </span>
        <span
          onClick={() => dispatch(deleteSingleTodos(todo._id))}
          className="text-xl text-gray-300 hover:text-red-500
          duration-300 cursor-pointer"
        >
          <MdDelete />
        </span>
      </div>
      {isExpanded && todo.descr.length > 0 && (
        <motion.div
          className="w-full mt-2 text-gray-500 text-sm"
          initial={{ 'height': 0, 'opacity': 0 }}
          animate={{ 'height': 'auto', 'opacity': 1 }}
          exit={{ 'height': 0, 'opacity': 0 }}
          transition={{ 'duration': 0.2 }}
        >
          <p className="whitespace-pre-wrap">{todo.descr}</p>
        </motion.div>
      )}
    </motion.li>
  )
}

export default TodoItem
