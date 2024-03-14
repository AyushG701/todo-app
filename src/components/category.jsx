/* eslint-disable id-length */
/* eslint-disable quote-props */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import TodoList from './todo-list';

import { filterTodosByCategory } from '../utils/filter-todos-by-category';

const Category = () => {
  const [todosByCategory, setTodosByCategory] = useState({
    Personal: [],
    Business: [],
    Others: [],
  });
  const [activeCategory, setActiveCategory] = useState('Personal');
  const todosItem = useSelector((state) => state.todos.todosList);

  useEffect(() => {
    const categories = Object.keys(todosByCategory);
    const newTodosByCategory = {};

    for (const category of categories) {
      newTodosByCategory[category] = filterTodosByCategory(todosItem, category);
    }

    setTodosByCategory(newTodosByCategory);
  }, [todosItem]);

  return (
    <motion.div
      className="w-full lgl:w-[850px] h-[350px] md:h-[250px] bg-bodyColor mb-5
        flex flex-col md:flex-row items-center justify-start shadow-todoShadow"
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ x: { type: 'spring', damping: 10, stiffness: 50 } }}
    >
      <div className="w-full md:w-1/5 h-full">
        <div
          className={`w-full h-1/3 border border-gray-500 text-gray-300 
          hover:text-white duration-300 flex items-center justify-center 
          cursor-pointer 
          ${activeCategory === 'personal' && 'text-white bg-gray-500'}`}
          onClick={() => setActiveCategory('Personal')}
        >
          Personal
        </div>
        <div
          className={`w-full h-1/3 border border-gray-500 text-gray-300 
          hover:text-white duration-300 flex items-center justify-center 
          cursor-pointer 
          ${activeCategory === 'business' && 'text-white bg-gray-500'}`}
          onClick={() => setActiveCategory('Business')}
        >
          Business
        </div>
        <div
          className={`w-full h-1/3 border border-gray-500 text-gray-300 
          hover:text-white duration-300 flex items-center justify-center 
          cursor-pointer 
          ${activeCategory === 'others' && 'text-white bg-gray-500'}`}
          onClick={() => setActiveCategory('Others')}
        >
          Others
        </div>
      </div>
      <div
        className="w-full mdl:w-5/6 h-full overflow-x-hidden
      overflow-y-scroll scrollbar-thin scrollbar-thumb-green-500
      scrollbar-track-transparent"
      >
        {todosByCategory[activeCategory].length === 0 ? (
          <motion.p
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              x: { type: 'spring', damping: 10, stiffness: 120 },
            }}
            className="text-green-600 text-center font-medium tracking-wide
            h-full flex flex-col justify-center items-center"
          >
            Click on the tab to choose your category
          </motion.p>
        ) : (
          <div className="flex flex-col items-center px-4">
            <h3 className="text-lg mt-3">{activeCategory} Todos:</h3>
            <TodoList todosItems={todosByCategory[activeCategory]} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Category;
