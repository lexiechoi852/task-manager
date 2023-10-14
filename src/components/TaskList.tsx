import {Button, Table} from "react-bootstrap";
import {format} from "date-fns";
import {Task} from "../App.tsx";

interface TaskListProps {
    tasks: Task[];
    removeTask: (taskId: number) => void;
}

const TaskList = ({ tasks, removeTask }: TaskListProps) => {
    return (
        <Table className="container mt-4 align-middle">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Category</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{typeof task.dueDate === 'string' ? task.dueDate : format(task.dueDate ,'yyyy-mm-dd')}</td>
                            <td>{task.category}</td>
                            <td>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => removeTask(task.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
};

export default TaskList;