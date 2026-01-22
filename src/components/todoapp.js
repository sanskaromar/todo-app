import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Todos(props) {
  const history = useHistory();
  const [tasks, setTasks] = useState([]);
  const [creationTimes, setCreationTimes] = useState([]);
  const [status, setStatus] = useState([]);
  const [labels, setLabels] = useState([]);
  const [taskLabels, setTaskLabels] = useState([]);
  const addTasks = [];
  const [flag, setFlag] = useState(0);
  const { autoSave, setPercentage } = props;

  useEffect(() => {
    const value = Math.floor(
      (100 * status.filter((x) => x === 1).length) / status.length
    );
    setPercentage(value);
  }, [status, setPercentage]);

  const textAreaAdjust = (event) => {
    event.target.style.height = "1px";
    event.target.style.height = 10 + event.target.scrollHeight + "px";
  };
  console.log("🚀 ~ Todos ~ labels", labels);
  console.log("🚀 ~ Todos ~ taskLabels", taskLabels);

  for (let i = 0; i < tasks.length; i++) {
    addTasks.push(
      <>
        <div className="flex relative flex-row mb-2 w-full items-center md:w-2/3">
          {status[i] === 0 ? (
            <input
              type="checkbox"
              className="form-checkbox rounded h-6 w-6 mx-2 text-gray-800 bg-gray-700 border-blue-300 border-2 "
              onClick={(e) => {
                setStatus(
                  status.map((stat, index) => (index === i ? (stat = 1) : stat))
                );
              }}
            />
          ) : (
            <input
              type="checkbox"
              className="form-checkbox rounded h-6 w-6 mx-2 text-gray-800 bg-gray-700 border-blue-300 border-2 "
              defaultChecked
              onClick={(e) => {
                setStatus(
                  status.map((stat, index) => (index === i ? (stat = 0) : stat))
                );
              }}
            />
          )}

          <textarea
            className="w-full resize-none overflow-hidden rounded-2xl border-4 border-blue-300 px-2 py-1 text-gray-800 bg-gray-300 focus:bg-gray-400 focus:text-white focus:border-blue-200 text-3xl dark:bg-gray-700 dark:text-white"
            type="text"
            value={tasks[i]}
            placeholder={`Add a new task`}
            rows="1"
            onChange={(e) => {
              setTasks(
                tasks.map((task, index) =>
                  index === i ? e.target.value : task
                )
              );
            }}
            onKeyUp={(e) => {
              textAreaAdjust(e);
            }}
          />
          <select
            className="w-aut text-right absolute right-12 top-1 text-gray-800 bg-gray-300 focus:bg-gray-400 focus:text-white focus:border-blue-200 text-sm rounded-md py-1 pt-0 border-0"
            value={taskLabels[i]}
            onChange={(e) => {
              console.log(e.target.value);
              setTaskLabels(
                taskLabels.map((taskLabel, index) =>
                  index === i ? e.target.value : taskLabel
                )
              );
            }}
          >
            {labels.map((label, index) => (
              <option value={labels.indexOf(label)}>{label}</option>
            ))}
          </select>
          <span className="text-gray-700 absolute right-12 pr-1 bottom-1 text-sm">
            {creationTimes[i]}
          </span>
          {/* Delete Button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 px-2 hover:bg-red-600 cursor-pointer bg-gray-900 bg-opacity-0 rounded-full flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            onClick={(e) => {
              setTasks(tasks.filter((task, index) => index !== i));
              setCreationTimes(
                creationTimes.filter((time, index) => index !== i)
              );
              setStatus(status.filter((stat, index) => index !== i));
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </>
    );
  }

  Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj));
  };
  Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key));
  };

  const save = () => {
    localStorage.setObj("tasks", tasks);
    localStorage.setObj("creationTimes", creationTimes);
    localStorage.setObj("status", status);
    localStorage.setObj("labels", labels);
    localStorage.setObj("taskLabels", taskLabels);
  };

  const clear = () => {
    console.log("clearing");
    setTasks(["Add a new Task"]);
    setCreationTimes([getTime()]);
    setStatus([0]);
    setTaskLabels([0]);
    setFlag(1);
  };

  useEffect(() => {
    if (flag === 1) {
      localStorage.setObj("tasks", tasks);
      localStorage.setObj("creationTimes", creationTimes);
      localStorage.setObj("status", status);
      localStorage.setObj("labels", labels);
      localStorage.setObj("taskLabels", taskLabels);
      setFlag(0);
    }
    // eslint-disable-next-line
  }, [flag]);

  const signOut = () => {
    localStorage.clear();
    document.querySelector("#main").classList.remove("dark");
    history.push("/");
  };

  const getTime = () => {
    return new Date().toLocaleString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
    });
  };

  useEffect(() => {
    if (
      localStorage.getObj("tasks") &&
      localStorage.getObj("status") &&
      localStorage.getObj("creationTimes") &&
      localStorage.getObj("labels") &&
      localStorage.getObj("taskLabels")
    ) {
      setTasks(localStorage.getObj("tasks"));
      setCreationTimes(localStorage.getObj("creationTimes"));
      setLabels(localStorage.getObj("labels"));
      setStatus(localStorage.getObj("status"));
      setTaskLabels(localStorage.getObj("taskLabels"));
      console.log("Loaded from Local Storage");
    } else {
      setTasks([
        "Add your first Task",
        "Track progress with checkbox",
        "Delete tasks when not required",
        "",
        "",
      ]);
      setCreationTimes([getTime(), getTime(), getTime(), getTime(), getTime()]);
      setStatus([1, 1, 0, 0, 0]);
      setLabels(["In Progress", "On Hold", "High Priority", "Less Priority"]);
      setTaskLabels([0, 0, 0, 0, 0]);
      console.log("Loaded default");
    }
  }, []);

  //AutoSave
  useEffect(() => {
    if (autoSave) save();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, creationTimes, status, labels, taskLabels, autoSave]);

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="flex flex-col items-center md:w-4/5">
        <div className="flex-row">
          <button
            className="h-10 w-40 mx-4 my-4 text-green-600 text-xl rounded-md hover:bg-green-400 hover:text-white cursor-pointer bg-gray-100 bg-opacity-0 flex-shrink-0"
            onClick={save}
          >
            Save
          </button>
          <button
            className="h-10 w-40 mx-4 my-4 text-green-600 text-xl rounded-md hover:bg-green-400 hover:text-white cursor-pointer bg-gray-100 bg-opacity-0 flex-shrink-0"
            onClick={clear}
          >
            Clear
          </button>
        </div>
        {addTasks}
        {/* Add more tasks fields button */}
        <button
          className="h-10 w-10 mx-auto text-green-600 text-4xl hover:bg-green-400 hover:text-white cursor-pointer bg-gray-100 bg-opacity-0 rounded-full flex-shrink-0"
          onClick={() => {
            setTasks([...tasks, ""]);
            setStatus([...status, 0]);
            setCreationTimes([...creationTimes, getTime()]);
            setTaskLabels([...taskLabels, 0]);
          }}
        >
          +
        </button>
        <button
          className="h-10 w-40 mx-auto mt-2 text-green-600 text-xl rounded-md hover:bg-green-400 hover:text-white cursor-pointer bg-gray-100 bg-opacity-0 flex-shrink-0"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </div>
      <div className="flex flex-col items-center justify-start md:w-1/5 space-y-3">
        <span className="text-blue-500 font-bold text-xl mr-auto">Labels</span>
        {labels.map((label, i) => (
          <div className="flex flex-row items-center mr-auto relative" key={i}>
            <span className="text-bold text-xl bg-blue-500 px-2 absolute -left-8 rounded-xl">
              {
                taskLabels.filter(
                  (labelIndex) => parseInt(labelIndex) === labels.indexOf(label)
                ).length
              }
            </span>
            <input
              type="text"
              className="h-10 w-40 mx-auto text-center text-gray-700 text-xl rounded-md hover:bg-blue-400 hover:text-white cursor-pointer bg-gray-100 bg-opacity-0 flex-shrink-0"
              value={label}
              onChange={(e) => {
                let newLabels = [...labels];
                newLabels[i] = e.target.value;
                setLabels(newLabels);
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-2 text-white hover:text-red-600 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={(e) => {
                setTaskLabels(
                  taskLabels.map((taskLabel, index) => {
                    if (index === i) {
                      return 0;
                    } else {
                      return taskLabel;
                    }
                  })
                );
                setLabels(labels.filter((label, index) => index !== i));
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        ))}
        <button
          className="h-10 w-40 mr-auto text-green-600 text-xl rounded-md hover:bg-green-400 hover:text-white cursor-pointer bg-gray-100 bg-opacity-0 flex-shrink-0"
          onClick={() => {
            setLabels([...labels, ""]);
          }}
        >
          Add Label
        </button>
      </div>
    </div>
  );
}
