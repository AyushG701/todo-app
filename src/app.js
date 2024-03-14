import { useSelector } from 'react-redux'

import Category from './components/category'
import InputForm from './components/input-form'

function App() {
  const todosItems = useSelector((state) => state.todos.todosList)

  return (
    <div className="w-full min-h-screen py-8 px-3 lg:px-0 font-bodyFont
    bg-gradient-to-t from-sky-600 via-sky-400 to-sky-300 text-white
    flex flex-col justify-center items-center">
      <div className="font-extrabold text-3xl md:text-5xl text-bodyColor
      mb-6">ToDo Application</div>
      {todosItems.length > 0 ? <Category /> : undefined}
      <InputForm/>
    </div>
  )
}

export default App
