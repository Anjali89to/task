import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // ================= GET TASKS =================
  const getTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setTasks([]);
    }
  };

  // ================= ADD =================
  const addTask = async () => {
    if (!title.trim()) return;

    await API.post(
      "/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    getTasks();
  };

  // ================= UPDATE =================
  const updateTask = async () => {
    if (!title.trim()) return;

    await API.put(
      `/tasks/${editId}`,
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    setEditId(null);
    getTasks();
  };

  // ================= DELETE =================
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    getTasks();
  };

  // ================= TOGGLE =================
  const toggleStatus = async (task) => {
    await API.put(
      `/tasks/${task._id}`,
      {
        status: task.status === "pending" ? "completed" : "pending",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  // ================= SEARCH FILTER =================
  const filteredTasks = tasks.filter((t) =>
    (t.title || "")
      .toLowerCase()
      .trim()
      .includes(search.toLowerCase().trim())
  );

  // ================= STATS =================
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  return (
    <div className="page">
      <div className="container">

        {/* HEADER */}
        <div className="header">
          <div>
            <h1>Task Dashboard</h1>
            <p>Manage your tasks in style</p>
          </div>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="card blue">
            <h3>Total</h3>
            <h2>{total}</h2>
          </div>

          <div className="card white">
            <h3>Completed</h3>
            <h2>{completed}</h2>
          </div>

          <div className="card black">
            <h3>Pending</h3>
            <h2>{pending}</h2>
          </div>
        </div>

        {/* INPUT */}
        <div className="card inputCard">
          <input
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={editId ? updateTask : addTask}>
            {editId ? "Update" : "Add"}
          </button>

          {editId && (
            <button className="cancel" onClick={() => setEditId(null)}>
              Cancel
            </button>
          )}
        </div>

        {/* SEARCH */}
        <div className="searchBox">
          <input
            placeholder="Search tasks by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LIST */}
        <div className="list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((t) => (
              <div key={t._id} className="task">

                <span className={t.status === "completed" ? "done" : ""}>
                  {t.title}
                </span>

                <div className="actions">

                  <button className="blue" onClick={() => toggleStatus(t)}>
                    {t.status === "pending" ? "Done" : "Undo"}
                  </button>

                  <button
                    className="white"
                    onClick={() => {
                      setTitle(t.title);
                      setEditId(t._id);
                    }}
                  >
                    Edit
                  </button>

                  <button className="red" onClick={() => deleteTask(t._id)}>
                    Delete
                  </button>

                </div>

              </div>
            ))
          ) : (
            <div className="empty">
              No tasks found
            </div>
          )}
        </div>

      </div>

      {/* ================= STYLE ================= */}
      <style>{`
        * {
          font-family: "Times New Roman", Times, serif;
        }

        .page {
          min-height: 100vh;
          padding: 30px;
          background: linear-gradient(135deg, #0b0f1a, #0f172a, #1e3a8a);
          color: white;
        }

        .container {
          max-width: 900px;
          margin: auto;
        }

        .header h1 {
          font-size: 40px;
          margin: 0;
        }

        .header p {
          color: #cbd5e1;
        }

        /* STATS */
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin: 20px 0;
        }

        .card {
          padding: 20px;
          border-radius: 14px;
          text-align: center;
        }

        .blue {
          background: #2563eb;
        }

        .white {
          background: white;
          color: black;
        }

        .black {
          background: #020617;
        }

        /* INPUT */
        .inputCard {
          display: flex;
          gap: 10px;
          background: white;
          color: black;
        }

        input {
          flex: 1;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
        }

        button {
          padding: 10px 14px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
        }

        /* SEARCH */
        .searchBox {
          margin: 15px 0;
        }

        .searchBox input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          outline: none;
        }

        /* LIST */
        .list {
          margin-top: 20px;
        }

        .task {
          background: white;
          color: black;
          padding: 15px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .done {
          text-decoration: line-through;
          color: gray;
        }

        .empty {
          text-align: center;
          padding: 20px;
          color: #cbd5e1;
        }

        /* COLORS */
        .blue { background: #2563eb; color: white; }
        .white { background: white; border: 1px solid #2563eb; color: #2563eb; }
        .red { background: #dc2626; color: white; }
        .cancel { background: black; color: white; }

        button:hover {
          transform: scale(1.05);
          transition: 0.2s;
          opacity: 0.9;
        }
      `}</style>

    </div>
  );
}

export default Dashboard;