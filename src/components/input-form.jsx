/* eslint-disable max-statements */
/* eslint-disable complexity */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodos, deleteAllTodos } from '../store/todo-slice';

import TodoList from './todo-list';
import ErrorMessage from './error-message';
import SuccessMessage from './success-message';
import Modal from './UI/modal';

import uuid4 from 'uuid4';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

import { hasKeyword } from '../utils/has-keyword';

const InputForm = () => {
  const [todoValue, setTodoValue] = useState('');
  const [descrValue, setDescrValue] = useState('');
  const [category, setCategory] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [colorValue, setColorValue] = useState('#22C55E'.toLowerCase());

  const dispatch = useDispatch();
  const todosItems = useSelector((state) => state.todos.todosList);

  const options = [
    {
      _id: 1000,
      title: 'Categories',
    },
    {
      _id: 1001,
      title: 'Personal',
    },
    {
      _id: 1002,
      title: 'Business',
    },
    {
      _id: 1003,
      title: 'Others',
    },
  ];
  const keywords = [
    'important',
    'важливо',
    'дедлайн',
    'зараз',
    'danger',
    'deadline',
    'now',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      showError && setShowError(false);
      showSuccess && setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showError, showSuccess]);

  const handleTodoAdd = (e) => {
    e.preventDefault();

    if (todoValue === '') {
      setErrMessage('Please, write your Todo!');
      setShowError(true);
      setShowSuccess(false);
    } else if (category === '') {
      setErrMessage('Please, select a category!');
      setShowError(true);
      setShowSuccess(false);
    } else if (category === 'Categories') {
      setErrMessage('Please, select a valid  category!');
      setShowError(true);
      setShowSuccess(false);
    } else {
      const isImportant = hasKeyword(todoValue, keywords) || isChecked;
      dispatch(
        addTodos({
          _id: uuid4().toString(),
          todo: todoValue,
          descr: descrValue,
          category,
          important: isImportant,
          color: colorValue,
        })
      );
      setTodoValue('');
      setDescrValue('');
      setIsChecked(false);
      setShowCheckbox(false);
      setShowError(false);
      setSuccessMessage(`"${todoValue}" added in list`);
      setShowSuccess(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    dispatch(deleteAllTodos());
    setShowModal(false);
  };

  const handleDeleteAllClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <form
      className="w-full lgl:w-[850px] bg-bodyColor p-6
    flex flex-col gap-4 rounded-md shadow-todoShadow"
    >
      <div
        className="w-full mt-3 bg-bodyColor flex flex-col
      mdl:flex-row items-center gap-4 mdl:h-10"
      >
        <div
          className="relative w-full mdl:w-[40%] h-full flex
        justify-between items-center"
        >
          {showCheckbox && (
            <div
              className="w-full absolute top-[-25px] flex gap-2
            items-center"
            >
              <input
                type="checkbox"
                value=""
                onChange={() => setIsChecked(!isChecked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
                rounded focus:ring-blue-500 opacity-70 dark:focus:ring-blue-60
                dark:border-gray-600 checked:opacity-100"
                title="Is important?"
              />
              <span
                className={`text-xs ${
                  isChecked ? 'text-gray-400' : 'text-white'
                }`}
              >
                Is important?
              </span>
            </div>
          )}
          <input
            onChange={(e) => {
              setTodoValue(e.target.value);
              setShowCheckbox(e.target.value.trim() !== '');
            }}
            value={todoValue}
            type="text"
            placeholder="Enter your todo..."
            className="w-full bg-bodyColor border border-gray-400 py-2
            px-4 h-full placeholder:text-gray-400 text-white text-base
            placeholder:text-sm tracking-wide rounded-md outline-none
            focus-visible:border-orange-600 hover:border-white"
          />
        </div>
        <input
          onChange={(e) => setDescrValue(e.target.value)}
          value={descrValue}
          type="text"
          placeholder="Enter your todo description..."
          className="w-full mdl:w-[40%]  h-full bg-bodyColor border
          border-gray-400 py-2 px-4 placeholder:text-gray-400 text-white
          text-base placeholder:text-sm tracking-wide rounded-md outline-none
          focus-visible:border-orange-600 hover:border-white"
        />
        <div className="w-full mdl:w-[20%] h-10 mdl:h-full relative">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-full text-center text-sm capitilize
            outline-none pr-4 bg-transparent color-border border-gray-400
            cursor-pointer appearance-none rounded-md
            focus-visible:border-orange-600 hover:border-white"
          >
            {options.map((option) => {
              // eslint-disable-next-line no-underscore-dangle
              return <option key={option._id}>{option.title}</option>;
            })}
          </select>
          <span className="absolute right-3 top-3">
            <FaChevronDown />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-start gap-3 w-full">
        <label className="text-sm">Pick the color:</label>
        <div className="w-full mdl:w-[20%] h-10 mdl:h-full relative">
          <input
            type="color"
            value={colorValue}
            onChange={(e) => setColorValue(e.target.value)}
            className="w-6 h-7 border-none bg-transparent outline-none"
          />
        </div>
      </div>
      <button
        onClick={handleTodoAdd}
        type="submit"
        className="w-full border border-gray-400 hover:border-gray-200
        duration-300 font-titleFont font-semibold tracking-wider
        text-gray-400 hover:text-orange-600 h-10 uppercase rounded-md
        bg-transparent"
      >
        Add Todo
      </button>
      <div className="flex flex-col gap-4">
        {todosItems.length === 0 && (
          <p
            className="text-center py-4 text-base text-yellow-500
            font-titleFont font-medium
              tracking-wide"
          >
            Your Todo list is empty!
          </p>
        )}
        {todosItems.length > 0 && (
          <>
            <TodoList todosItems={todosItems} />
            <motion.button
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ y: { type: 'spring', stiffness: 120 } }}
              onClick={handleDeleteAllClick}
              className="w-40 h-8 text-sm font-titleFont text-orange-500
              hover:text-red-500 font-semibold mx-auto bg-transparent border
              border-gray-500 hover:border-red-500 duration-300"
            >
              Deletе all Todos
            </motion.button>
          </>
        )}
      </div>
      {showError && <ErrorMessage message={errMessage} />}
      {showSuccess && <SuccessMessage message={successMessage} />}
      {showModal && (
        <Modal
          handleModalClose={handleModalClose}
          handleModalSubmit={handleModalSubmit}
        >
          <p className="text-xl text-center font-medium text-red-500">
            Are you sure you want to
            <span className="font-bold">delete</span> all Todos?
          </p>
        </Modal>
      )}
    </form>
  );
};

export default InputForm;
