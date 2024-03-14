import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  'todosList': [],
}

export const todoSlice = createSlice({
  'name': 'todos',
  initialState,
  'reducers': {
    'addTodos': (state, action) => {
      state.todosList.push(action.payload)
    },
    'deleteSingleTodos': (state, action) => {
      state.todosList = state.todosList.filter(
        // eslint-disable-next-line no-underscore-dangle
        (element) => element._id !== action.payload,
      )
    },
    'deleteAllTodos': (state) => {
      state.todosList = []
    },
    'dragTodos': (state, action) => {
      const { dragIndex, hoverIndex, dragItem } = action.payload
      const updatedTodosList = [...state.todosList]
      updatedTodosList.splice(dragIndex, 1)
      updatedTodosList.splice(hoverIndex, 0, dragItem)
      state.todosList = updatedTodosList
    },
  },
})

export const { addTodos, deleteSingleTodos, deleteAllTodos, dragTodos } =
  todoSlice.actions
export default todoSlice.reducer
