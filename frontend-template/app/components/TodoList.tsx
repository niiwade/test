import React from 'react'

function TodoList() {
    const [todos, setTodos] = React.useState<any>([]);
    
    React.useEffect(() => {
        fetch('http://localhost:3000/api/todos')
            .then(response => response.json())
            .then(data => setTodos(data));
    }, []);
    console.log(todos);
  return (
    <ul>
       

        {todos && todos?.data && todos?.data.map((todo: any) => (
            <li key={todo.id}>
                {todo.title}
            </li>
        ))}
    </ul>
  )
}

export default TodoList