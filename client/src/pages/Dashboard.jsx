import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  // ================= STATE =================
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // ================= GET TASKS =================
  const getTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ADD TASK =================
  const addTask = async () => {
    if (!title.trim()) {
      alert("Please enter task");
      return;
    }

    try {
      await API.post(
        "/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UPDATE TASK =================
  const updateTask = async () => {
    if (!title.trim()) {
      alert("Please enter task");
      return;
    }

    try {
      await API.put(
        `/tasks/${editId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setEditId(null);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE TASK =================
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= TOGGLE STATUS =================
  const toggleStatus = async (task) => {
    try {
      await API.put(
        `/tasks/${task._id}`,
        {
          status: task.status === "pending" ? "completed" : "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // ================= FILTER + SEARCH TASKS =================
  const filteredTasks = tasks.filter((task) => {
    const matchFilter = filter === "all" || task.status === filter;

    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingCount = tasks.filter((task) => task.status === "pending").length;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h1>Task Dashboard</h1>
            <p>Manage, search, filter, edit and delete your daily tasks easily</p>
          </div>

          <div className="header-badge">Blue Task Manager</div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card blue-card">
            <span>Total Tasks</span>
            <h2>{tasks.length}</h2>
          </div>

          <div className="stat-card white-card">
            <span>Completed</span>
            <h2>{completedCount}</h2>
          </div>

          <div className="stat-card dark-card">
            <span>Pending</span>
            <h2>{pendingCount}</h2>
          </div>
        </div>

        {/* ADD / UPDATE TASK */}
        <div className="task-box">
          <h2>{editId ? "Update Task" : "Add New Task"}</h2>

          <div className="input-row">
            <input
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              className={editId ? "update-btn" : "add-btn"}
              onClick={editId ? updateTask : addTask}
            >
              {editId ? "Update Task" : "Add Task"}
            </button>

            {editId && (
              <button
                className="cancel-btn"
                onClick={() => {
                  setTitle("");
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="search-filter-box">
          <div className="search-box">
            <label>Search Task</label>
            <input
              type="text"
              placeholder="Search by task title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-box">
            <label>Filter Status</label>

            <div className="filter-row">
              <button
                className={filter === "all" ? "filter-active" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>

              <button
                className={filter === "completed" ? "filter-active" : ""}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>

              <button
                className={filter === "pending" ? "filter-active" : ""}
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* TASK TABLE */}
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Status</th>
                <th>Toggle</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((t) => (
                  <tr key={t._id}>
                    <td>
                      <span
                        className={
                          t.status === "completed"
                            ? "task-title completed-title"
                            : "task-title"
                        }
                      >
                        {t.title}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          t.status === "completed"
                            ? "status completed"
                            : "status pending"
                        }
                      >
                        {t.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className={
                          t.status === "pending" ? "done-btn" : "undo-btn"
                        }
                        onClick={() => toggleStatus(t)}
                      >
                        {t.status === "pending" ? "Mark Done" : "Undo"}
                      </button>
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setTitle(t.title);
                          setEditId(t._id);
                        }}
                      >
                        Edit
                      </button>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(t._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-task">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .dashboard-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(37, 99, 235, 0.35), transparent 35%),
            linear-gradient(135deg, #020617, #0f172a 45%, #0b3a8d);
          padding: 35px 18px;
          font-family: "Times New Roman", Times, serif;
          color: #ffffff;
        }

        .dashboard-container {
          max-width: 1150px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
        }

        .dashboard-header h1 {
          margin: 0;
          font-size: 40px;
          font-weight: 900;
          color: #ffffff;
        }

        .dashboard-header p {
          margin-top: 8px;
          color: #cbd5e1;
          font-size: 16px;
        }

        .header-badge {
          background: #2563eb;
          color: white;
          padding: 12px 18px;
          border-radius: 999px;
          font-weight: 700;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.45);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 25px;
        }

        .stat-card {
          padding: 24px;
          border-radius: 20px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.22);
        }

        .stat-card span {
          font-size: 16px;
          font-weight: 700;
          opacity: 0.85;
        }

        .stat-card h2 {
          margin: 10px 0 0;
          font-size: 40px;
          font-weight: 900;
        }

        .blue-card {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
        }

        .white-card {
          background: #ffffff;
          color: #0f172a;
          border: 2px solid #dbeafe;
        }

        .white-card h2 {
          color: #2563eb;
        }

        .dark-card {
          background: #020617;
          color: white;
          border: 2px solid #1e40af;
        }

        .task-box,
        .search-filter-box {
          background: rgba(255, 255, 255, 0.96);
          color: #0f172a;
          border-radius: 22px;
          padding: 24px;
          margin-bottom: 22px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
          border: 2px solid #dbeafe;
        }

        .task-box h2 {
          margin: 0 0 18px;
          font-size: 24px;
          font-weight: 900;
          color: #0f172a;
        }

        .input-row {
          display: flex;
          gap: 12px;
        }

        .input-row input,
        .search-box input {
          flex: 1;
          width: 100%;
          padding: 15px 16px;
          border-radius: 14px;
          border: 2px solid #cbd5e1;
          outline: none;
          font-size: 16px;
          color: #0f172a;
          background: #ffffff;
          font-family: "Times New Roman", Times, serif;
        }

        .input-row input:focus,
        .search-box input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
        }

        .add-btn,
        .update-btn,
        .cancel-btn {
          border: none;
          padding: 14px 22px;
          border-radius: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.3s;
          white-space: nowrap;
          font-family: "Times New Roman", Times, serif;
          font-size: 16px;
        }

        .add-btn {
          background: #2563eb;
          color: white;
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.35);
        }

        .add-btn:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
        }

        .update-btn {
          background: #020617;
          color: white;
        }

        .update-btn:hover {
          background: #111827;
          transform: translateY(-2px);
        }

        .cancel-btn {
          background: #e2e8f0;
          color: #0f172a;
        }

        .cancel-btn:hover {
          background: #cbd5e1;
        }

        .search-filter-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          align-items: end;
        }

        .search-box label,
        .filter-box label {
          display: block;
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
        }

        .filter-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-row button {
          border: none;
          padding: 12px 22px;
          border-radius: 999px;
          background: #f1f5f9;
          color: #0f172a;
          font-weight: 800;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
          font-family: "Times New Roman", Times, serif;
          font-size: 16px;
        }

        .filter-row button:hover,
        .filter-row .filter-active {
          background: #2563eb;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .table-card {
          background: #ffffff;
          color: #0f172a;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
          border: 2px solid #dbeafe;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-family: "Times New Roman", Times, serif;
        }

        thead {
          background: linear-gradient(135deg, #020617, #1e3a8a);
          color: #ffffff;
        }

        th {
          padding: 18px;
          text-align: left;
          font-size: 16px;
          font-weight: 900;
        }

        td {
          padding: 17px 18px;
          border-bottom: 1px solid #e2e8f0;
          font-size: 16px;
        }

        tbody tr:hover {
          background: #eff6ff;
        }

        .task-title {
          font-weight: 800;
          color: #0f172a;
        }

        .completed-title {
          text-decoration: line-through;
          color: #94a3b8;
        }

        .status {
          padding: 7px 13px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 900;
          text-transform: capitalize;
        }

        .status.completed {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .status.pending {
          background: #f1f5f9;
          color: #020617;
        }

        .done-btn,
        .undo-btn,
        .edit-btn,
        .delete-btn {
          border: none;
          padding: 9px 14px;
          border-radius: 10px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.25s;
          font-family: "Times New Roman", Times, serif;
          font-size: 15px;
        }

        .done-btn {
          background: #2563eb;
          color: white;
        }

        .done-btn:hover {
          background: #1d4ed8;
        }

        .undo-btn {
          background: #020617;
          color: white;
        }

        .undo-btn:hover {
          background: #1e293b;
        }

        .edit-btn {
          background: #ffffff;
          color: #2563eb;
          border: 2px solid #2563eb;
        }

        .edit-btn:hover {
          background: #2563eb;
          color: #ffffff;
        }

        .delete-btn {
          background: #fee2e2;
          color: #dc2626;
        }

        .delete-btn:hover {
          background: #dc2626;
          color: #ffffff;
        }

        .empty-task {
          text-align: center;
          padding: 35px;
          font-weight: 800;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .dashboard-header h1 {
            font-size: 32px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .input-row {
            flex-direction: column;
          }

          .input-row button {
            width: 100%;
          }

          .search-filter-box {
            grid-template-columns: 1fr;
          }

          .table-card {
            overflow-x: auto;
          }

          table {
            min-width: 750px;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;