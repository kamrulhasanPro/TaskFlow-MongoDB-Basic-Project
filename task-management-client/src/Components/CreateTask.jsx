import React from "react";
import { toast } from "react-toastify";

const CreateTask = ({setTasks, tasks}) => {

    const handleTask = e => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const deadline = e.target.deadline.value;

        // console.log(title, description, deadline);
        const newTask = {title, description, deadline}

        fetch('http://localhost:4000/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if(data.insertedId){
                newTask.status = 'pending'
                setTasks([...tasks, newTask])
                e.target.reset()
                document.getElementById('my_modal_7').checked = false
                toast.success('done create new task')
            }
            
        })
        .catch(err => console.log(err))
    }

  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="my_modal_7" className="btn btn-accent">
        <span className="text-xl">+</span> Create New Task
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">

          {/* from */}
          <form onSubmit={handleTask} className="flex flex-col">
            {/* title */}
            <label htmlFor="title" className="text-xl font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
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
              className="my-input focus:text-black placeholder:text-black/20 text-black"
              placeholder="Enter description"
            />

            <button className="btn btn-success text-xl mt-7 text-white">
              Add Task
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};

export default CreateTask;
