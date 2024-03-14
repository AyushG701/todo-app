import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { AnimatePresence, motion } from "framer-motion";

const TodoItemWrapper = ({ children, id, todo, moveItem }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "todo-item",
    item: { id: id, index: todo.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "todo-item",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = todo.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const variants = {
    open: (i) => ({
      y: i * 68,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    }),
    closed: { y: 0, transition: { damping: 20, stiffness: 400 } },
  };

  return (
    <motion.div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      initial={{ scale: 1 }}
      animate={{ scale: isDragging ? 1.05 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >

      {todo.index !== undefined && (
        <motion.div
          key={todo.index}
          variants={variants}
          initial="closed"
          animate="open"
          exit="closed"
          style={{ width: "100%" }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TodoItemWrapper;
