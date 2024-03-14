import { motion } from 'framer-motion'
import { AiFillWarning } from 'react-icons/ai'

const ErrorMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ 'y': -20, 'opacity': 0 }}
      animate={{ 'y': 0, 'opacity': 1 }}
      transition={{
        'y': { 'type': 'string', 'stiffness': 120 },
      }}
      className="absolute font-titleFont tracking-wide font-medium
      text-md top-4 right-3 bg-bodyColor px-10 py-4 rounded-sm
      border-b-[6px] border-b-red-500 text-red-500"
    >
      <p className="flex items-center gap-4">
        <span className="text-xl">
          <AiFillWarning />
        </span>{' '}
        {message}
      </p>
    </motion.div>
  )
}

export default ErrorMessage
