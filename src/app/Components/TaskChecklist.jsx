import { Check, CheckCircle, Circle, Edit2, Plus, Save, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function TaskChecklist({ closeModal }) {

    const [taskName, setTaskName] = useState(""); 
    const [newTaskName, setNewTaskName] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editing, setEditing] = useState(null);
    const [errMsg, setErrMsg] = useState(null);

    const handleChangeTask = (e) => {
        setTaskName(e.target.value);
    }

    const handleAddTask = () => {
        if (taskName === "") {
            setErrMsg("Please fill out this field");
            return;
        }
        setTasks((prev) => [...prev, {task_name: taskName, complete: false}]);
        setErrMsg("");
        setTaskName("");
    }

    const handleTaskCheck = (taskIndex) => {
        setTasks((prevTasks) =>
            prevTasks.map((task, i) =>
                i === taskIndex ? { ...task, complete: !task.complete } : task
            )
        );
    }

    const handleDeleteTask = (taskIndex) => {
        setTasks((prevTasks => prevTasks.filter((__,  i) => taskIndex !== i)));
        setEditing(null);
    }

    const handleEditTask = (taskIndex, taskname) => {
        setEditing(taskIndex + 1);
        setNewTaskName(taskname);
        console.log(editing);
    }

    const handleChangeNewTask = (e) => {
        setNewTaskName(e.target.value);
    }

    const handleSaveTask = (taskIndex) => {
        setTasks((prevTasks) => prevTasks.map((task, i) => 
            i === taskIndex ? {...task, task_name: newTaskName} : task));
        setNewTaskName("");
        setEditing(false);
    }

    const handleCloseModal = () => {
        setErrMsg("");
        closeModal();
    }

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    return (
        <>
            <div className="">
                <div className="transform task-modal w-[400px] bg-neutral-900 border border-neutral-700 p-6 rounded-2xl">
                    <div className="header flex items-center justify-between mb-4">
                        <h2 className="font-serif flex items-center text-2xl">
                            Task Checklist
                        </h2>
                        <div className="close-tasks flex items-center hover:bg-neutral-700 active:scale-85 w-fit p-2 rounded-full transition-all duration-150 ease-in-out" onClick={handleCloseModal}>
                            <X size={18}/>
                        </div>
                    </div>
                    <div className="task-input flex items-center gap-3">
                        <input
                            type="text"
                            className="input bg-black border border-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:outline-none ring-0 focus-sans py-6"
                            placeholder="Add new task"
                            required
                            value={taskName}
                            onChange={handleChangeTask}
                        />
                        <div
                            className="flex items-center justify-center cursor-pointer bg-black p-3.75 rounded-xl border border-neutral-700 hover:bg-neutral-900 active:scale-95 transition-all duration-150 ease-in-out"
                            onClick={handleAddTask}
                        >
                            <Plus size={18} />
                        </div>
                    </div>
                    <div className="err-msg">
                        <p className="text-red-500 pt-1 text-sm pl-2">{errMsg ? errMsg : ""}</p>
                    </div>
                    <div className="task-list">
                        <ul
                            className={`${
                                tasks.length > 0 ? "mt-7" : "mt-0"
                            } flex flex-col gap-2`}
                        >
                            {tasks.map((task, index) => (
                                <li
                                    key={index}
                                    className="border cursor-pointer border-neutral-800 rounded-lg py-3 px-3 flex items-center justify-between"
                                >
                                    <div className="left flex items-center justify-center gap-3">
                                        {!task.complete ? (
                                            <>
                                                <Circle
                                                    size={20}
                                                    className="cursor-pointer transform translate-y-[0px]"
                                                    onClick={() =>
                                                        handleTaskCheck(index)
                                                    }
                                                />
                                                {editing && editing === index + 1 ? (
                                                    <input
                                                        className="border-b outline-none  border-neutral-700"
                                                        value={newTaskName}
                                                        onChange={
                                                            handleChangeNewTask
                                                        }
                                                    />
                                                ) : (
                                                    <p className="select-none">
                                                        {task.task_name}
                                                    </p>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle
                                                    size={20}
                                                    className="cursor-pointer transform translate-y-[0px]"
                                                    onClick={() =>
                                                        handleTaskCheck(index)
                                                    }
                                                />
                                                {editing && editing === index + 1 ? (
                                                    <input
                                                        className="border-b outline-none  border-neutral-700"
                                                        value={newTaskName}
                                                        onChange={
                                                            handleChangeNewTask
                                                        }
                                                    />
                                                ) : (
                                                    <p className="select-none line-through opacity-50">
                                                        {task.task_name}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <div className="right flex items-center gap-5">
                                        {editing && editing === index + 1 ? (
                                            <div
                                                className="edit-btn cursor-pointer hover:text-neutral-200 text-neutral-600 transition-all duration-150 ease-in-out"
                                                onClick={() =>
                                                    handleSaveTask(index)
                                                }
                                            >
                                                <Save size={17} />
                                            </div>
                                        ) : (
                                            <div
                                                className="edit-btn cursor-pointer hover:text-neutral-200 text-neutral-600 transition-all duration-150 ease-in-out"
                                                onClick={() =>
                                                    handleEditTask(index, task.task_name)
                                                }
                                            >
                                                <Edit2 size={17} />
                                            </div>
                                        )}
                                        <div
                                            className="del-btn cursor-pointer hover:text-red-500 text-neutral-600 transition-all duration-150 ease-in-out"
                                            onClick={() =>
                                                handleDeleteTask(index)
                                            }
                                        >
                                            <Trash size={17} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );

}