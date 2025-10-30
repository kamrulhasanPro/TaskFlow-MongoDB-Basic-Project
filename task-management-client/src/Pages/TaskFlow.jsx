import React from "react";
import CreateTask from "../Components/CreateTask";
import { use } from "react";
import PendingTask from "../Components/PendingTask";
import { useState } from "react";
import { useEffect } from "react";
import CompleteTask from "../Components/CompleteTask";
import { toast } from "react-toastify";
// const promise = fetch("http://localhost:4000/task-flow").then((res) =>
//   res.json()
// );
const TaskFlow = () => {
  const [tasks, setTasks] = useState([]);
  const [tasksComplete, setTasksComplete] = useState([]);
  const [sendModal, setSendModal] = useState(null);
  const share = { tasksComplete, setTasksComplete, tasks, setTasks };

  //   read pending and complete data from database
  useEffect(() => {
    fetch("http://localhost:4000/task-flow/pending")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:4000/task-flow/complete")
      .then((res) => res.json())
      .then((data) => setTasksComplete(data));
  }, []);

  //   edit task
  const handleEdit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const deadline = e.target.deadline.value;
    const id = sendModal._id;
    // console.log(title, description, deadline, id);
    const newTask = { title, description, deadline, id };

    fetch("http://localhost:4000/tasks", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount) {
          newTask.status = "pending";
          newTask._id = id;
          const remaining = tasks.filter((task) => task._id !== id);
          setTasks([...remaining, newTask]);
          e.target.reset();
          document.getElementById("my_modal_8").checked = false;
          toast.success("Updated this task");
        }
      })
      .catch((err) => toast.error(err.code));
  };

  return (
    <>
      <section>
        {/* create task */}
        <div className="flex items-center justify-center">
          <CreateTask setTasks={setTasks} tasks={tasks} />
        </div>

        {/* two layout pending and complete */}
        <div className="flex flex-col md:flex-row gap-7">
          {/* panding */}
          <aside className="flex-2 z-20">
            {/* title */}
            <div className="text-secondary text-2xl font-semibold pb-1 group">
              <p>Pending Task</p>

              <div className=" p-px w-1/12 transition-all bg-pink-400 group-hover:w-3/12 mt-1"></div>
            </div>

            {/* all task  */}
            <div className="p-7 bg-white/20 rounded-lg backdrop-blur-md mt-4 z-20">
              {tasks.length === 0 ? (
                <p className="text-xl font-semibold text-gray-400">
                  Not found task. Please create new task
                </p>
              ) : (
                tasks.map((task) => (
                  <PendingTask
                    key={task._id}
                    task={task}
                    share={share}
                    onEdit={() => setSendModal(task)}
                  />
                ))
              )}
            </div>
          </aside>

          {/* complete */}
          <aside className="flex-1 z-10">
            {/* title */}
            <div className="text-secondary text-2xl font-semibold pb-1 group">
              <p>Complete Task</p>
              <div className=" p-px w-2/12 transition-all bg-pink-400 group-hover:w-5/12 mt-1"></div>
            </div>

            {/* all complete task */}
            <div className="p-7 bg-black/20 rounded-lg backdrop-blur-md mt-4 z-10">
              {tasksComplete.length === 0 ? (
                <p className="text-xl font-semibold text-gray-400">
                  No any complete task.
                </p>
              ) : (
                tasksComplete.map((task) => (
                  <CompleteTask key={task._id} task={task} share={share} />
                ))
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* modal 8 */}
      {sendModal && (
        <>
          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my_modal_8" className="modal-toggle" />
          <div className="modal h-screen fixed" role="dialog">
            <div className="modal-box ">
              {/* from */}
              <form onSubmit={handleEdit} className="flex flex-col">
                {/* title */}
                <label htmlFor="title" className="text-xl font-semibold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={sendModal.title}
                  className="my-input focus:text-black placeholder:text-black/20 text-black"
                  placeholder="Enter title"
                />

                {/* description */}
                <label
                  htmlFor="description"
                  className="text-xl font-semibold mb-1 mt-4"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  defaultValue={sendModal.description}
                  className="my-input focus:text-black placeholder:text-black/20 text-black"
                  placeholder="Enter description"
                />

                {/* deadline */}
                <label
                  htmlFor="deadline"
                  className="text-xl font-semibold mb-1 mt-4"
                >
                  Description
                </label>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  defaultValue={sendModal.deadline}
                  className="my-input focus:text-black placeholder:text-black/20 text-black"
                  placeholder="Enter description"
                />

                <button className="btn btn-success text-xl mt-7 text-white">
                  Updata Task
                </button>
              </form>
            </div>
            <label
              className="modal-backdrop"
              htmlFor="my_modal_8"
              onClick={() => setSendModal(null)}
            >
              Close
            </label>
          </div>
        </>
      )}
    </>
  );
};

export default TaskFlow;
