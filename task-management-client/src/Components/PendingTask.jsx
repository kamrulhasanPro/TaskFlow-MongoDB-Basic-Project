import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GoKebabHorizontal } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

const PendingTask = ({ task, onEdit, share }) => {
  const { setTasks, tasks, tasksComplete, setTasksComplete } = share;
  const { title, description, deadline, _id, status } = task || {};
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleEvent(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleEvent);
    return () => document.removeEventListener("mousedown", handleEvent);
  }, []);

  const handleDelete = () => {
    fetch(`http://localhost:4000/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount) {
          const filter = tasks.filter((task) => task._id !== _id);
          setTasks(filter);
          toast.success("Delete success");
        }
      })
      .catch((err) => toast.error(err.code));
  };

  const handleComplete = () => {
    fetch(`http://localhost:4000/task/${_id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount) {
          const filter = tasks.filter((task) => task._id !== _id);
          setTasks(filter);
          const find = tasks.find((task) => task._id === _id);
          find.status = "complete";
          setTasksComplete([...tasksComplete, find]);
          toast.success("done create new task");
        }
      })
      .catch((err) => toast.error(err.code));
  };

  return (
    <div className="">
      <div className="bg-success/10 p-2 rounded-lg back flex items-center justify-between gap-2 z-0 mt-3">
        {/* content */}
        <div>
          <p className="px-2 py-0.5 pb-0.5 rounded-2xl bg-red-200 inline-block text-red-400 my-2">
            {status}
          </p>
          <h1 className="text-2xl">{title}</h1>
          <p className="text-lg text-gray-300 mt-2">{description}</p>
          <p className="text-sm text-gray-400">{deadline}</p>
        </div>

        {/* edit delete */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setShow(!show)} className="cursor-pointer z-0">
            <GoKebabHorizontal className="rotate-90" fill="#00d390" size={24} />
          </button>

          {show && (
            <ul
              id="dropdown"
              className="menu absolute rounded-box bg-base-100 shadow-sm shadow-emerald-400 text-emerald-400 "
            >
              <li>
                <button onClick={handleComplete}>
                  <FaCheck /> Complete
                </button>
              </li>
              <li>
                <label onClick={() => onEdit()} htmlFor="my_modal_8">
                  <CiEdit /> Edit
                </label>
              </li>
              <li>
                <button onClick={handleDelete} className="text-red-400">
                  <RiDeleteBin6Line fill="red" /> Delete
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingTask;
