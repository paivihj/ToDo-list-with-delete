import React from 'react';

export default function Todolist(props){

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Date</th><th>Description</th>
                    </tr>
                {
                props.todos.map((todo, index)=>
                    <tr key={index}>
                        <td>{todo.date}</td>
                        <td>{todo.description}</td>
                        <td><button id={index} onClick={props.deleteTodo}>Delete</button></td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    );
}