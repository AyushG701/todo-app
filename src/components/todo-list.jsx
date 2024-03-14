import { useState } from "react";
import { useDispatch } from "react-redux";
import { dragTodos } from "../store/todo-slice";

import { AnimatePresence, motion } from "framer-motion";
import TodoItemWrapper from "./todo-item-wrapper";
import TodoItem from "./todo-item";

const TodoList = ({ todosItems }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const dispatch = useDispatch();

  const handleItemClick = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleExpandClick = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const dragItem = todosItems[dragIndex];
    dispatch(
      dragTodos({
        dragIndex,
        hoverIndex,
        dragItem,
      })
    );
  };

  return (
    <ul className="w-full grid grid-cols-1 gap-4 my-2 rounded-sm p-4">
      {todosItems.length > 0 && (
        <AnimatePresence>
          {todosItems.map((todo, index) => {
            const isSelected = selectedItems.includes(todo._id);
            const isExpanded = expandedItems.includes(todo._id);
            const updatedTodo = { ...todo, index }; // add index in todo
            return (
              <TodoItemWrapper
                key={todo._id}
                id={todo._id}
                todo={updatedTodo}
                moveItem={moveItem}
              >
                <TodoItem
                  todo={updatedTodo}
                  handleExpandClick={handleExpandClick}
                  handleItemClick={handleItemClick}
                  isSelected={isSelected}
                  isExpanded={isExpanded}
                />
              </TodoItemWrapper>
            );
          })}
        </AnimatePresence>
      )}
    </ul>
  );
};

export default TodoList;
