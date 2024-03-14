export function filterTodosByCategory(todos, category) {
  return todos.filter((element) => element.category === category)
}
