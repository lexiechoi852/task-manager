import {useEffect, useState} from "react";
import TaskForm from "./components/TaskForm.tsx";
import TaskList from "./components/TaskList.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export interface Task {
    id: number;
    title: string;
    dueDate: Date | string;
    category: string;
}

function App() {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        const storage = localStorage.getItem('Tasks')

        if (storage) {
            const records = JSON.parse(storage)
            records.map((record: Task) => {
                record.dueDate = new Date(record.dueDate)
            })
            setTasks((records))
        }
    }, []);

    const addTask = (title: string, dueDate: string, category: string) => {
        const newTask = {
            id: tasks.length,
            title,
            dueDate: new Date(dueDate),
            category
        }
        const newTasks = tasks.concat(newTask);

        setTasks(newTasks);
        localStorage.setItem('Tasks', JSON.stringify(newTasks));
    }

    const removeTask = (taskId: number) => {
        const newTasks = tasks.filter((task) => task.id !== taskId);

        setTasks((newTasks));
        localStorage.setItem('Tasks', JSON.stringify(newTasks));
    }

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <TaskForm addTask={addTask}/>
            {tasks.length > 0 ? <TaskList tasks={tasks} removeTask={removeTask}/> : <div className="mb-2">No tasks yet</div>}
        </div>
    );
}

export default App
