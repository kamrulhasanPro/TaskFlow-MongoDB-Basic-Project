import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

const CompleteTask = ({ task, share }) => {
  const { title, description, deadline, _id, status } = task || {};

  const {tasksComplete, setTasksComplete} = share

    const handleDelete = () => {
    fetch(`http://localhost:4000/task/${_id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        if(data.deletedCount){
            const filter = tasksComplete.filter(task => task._id !== _id)
            setTasksComplete(filter)
            toast.success('Delete success')
        }
    })
    .catch(err => toast.error(err.code))
    
  }
  return (
    <>
      <div className="">
        <div className="bg-success/10 p-2 rounded-lg back flex items-center justify-between gap-4 z-0 mt-3">
          {/* content */}
          <div>
            <p className="px-2 py-0.5 pb-0.5 rounded-2xl bg-green-200 inline-block text-green-400 my-2">
              {status}
            </p>
            <h1 className="text-2xl">{title}</h1>
            <p className="text-lg text-gray-300 mt-2">{description}</p>
            <p className="text-sm text-gray-400">{deadline}</p>
          </div>

          <button onClick={handleDelete} className="text-red-400 cursor-pointer">
            <RiDeleteBin6Line fill="red" size={24} />
          </button>

          {/* edit delete
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShow(!show)}
              className="cursor-pointer z-0"
            >
              <GoKebabHorizontal
                className="rotate-90"
                fill="#00d390"
                size={24}
              />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CompleteTask;
