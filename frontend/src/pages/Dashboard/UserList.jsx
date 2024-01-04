import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import TableHeader from "../../components/TableHeader";
import Popover from "../../components/Popover";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [filteredUsers, setfilteredUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: localStorage.getItem("sortKey") || null,
    direction: localStorage.getItem("sortDirection") || "asc",
  });
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );

  const getUsers = async () => {
    try {
      if (!navigator.onLine) {
        return toast.error("No internet connection");
      }

      const authorization = localStorage.getItem("token");
      if (!authorization) navigate("/login");
      const response = await api.get("/admin/users", {
        headers: { authorization },
      });
      setUsers(response.data);
      setfilteredUsers(response.data);
      localStorage.setItem("users", JSON.stringify(response.data));
    } catch (error) {
      navigate("/login");
      toast.error("Only admins are allowed");
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    filteredUsers.sort((a, b) =>
      handleSortCompare(a, b, sortConfig.key, sortConfig.direction)
    );
    setfilteredUsers(filteredUsers);

    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery, users]);

  const convertDateFormat = (inputDate) => {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };

    return date.toLocaleDateString(undefined, options);
  };

  const handleDeleteConfirmation = (id, index) => {
    if (!navigator.onLine) return;
    setDeleteConfirmation(true);
    setUserToDelete([id, index]);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation(false);
    setUserToDelete(null);
  };

  const hanDeleteUser = async (id, index) => {
    try {
      if (!navigator.onLine) {
        return toast.error("No internet connection");
      }
      const authorization = localStorage.getItem("token");
      if (!authorization) navigate("/login");
      await api.delete(`/admin/users/${id}`, {
        headers: { authorization },
      });
      setUsers((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
      setDeleteConfirmation(false);
      setUserToDelete(null);
    } catch (error) {
      toast.error("An error occured");
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    localStorage.setItem("sortKey", key);
    localStorage.setItem("sortDirection", direction);
    setfilteredUsers((prev) => [
      ...prev.sort((a, b) => handleSortCompare(a, b, key, direction)),
    ]);
  };

  const handleSortCompare = (a, b, key, direction) => {
    if (!key) return;
    const aValue =
      key === "createdAt" || key === "updatedAt"
        ? new Date(a[key])
        : a[key].toLowerCase();
    const bValue =
      key === "createdAt" || key === "updatedAt"
        ? new Date(b[key])
        : b[key].toLowerCase();
    if (direction === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="mb-4 mx-auto max-w-7xl">
        <input
          type="text"
          id="search"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by Name, Email, or Phone"
          onChange={handleSearch}
          value={searchQuery}
        />
      </div>
      <div className="relative overflow-x-auto mx-auto max-w-7xl shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <TableHeader title="Name" field="name" handleSort={handleSort} />
              <TableHeader
                title="Email"
                field="email"
                handleSort={handleSort}
              />
              <TableHeader
                title="Phone"
                field="phone"
                handleSort={handleSort}
              />
              <TableHeader
                title="Gender"
                field="gender"
                handleSort={handleSort}
              />
              <TableHeader title="City" field="city" handleSort={handleSort} />
              <TableHeader
                title="State"
                field="state"
                handleSort={handleSort}
              />
              <TableHeader
                title="Created At"
                field="createdAt"
                handleSort={handleSort}
              />
              <TableHeader
                title="Updated At"
                field="updatedAt"
                handleSort={handleSort}
              />
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Options</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.gender}</td>
                <td className="px-6 py-4">{user.city}</td>
                <td className="px-6 py-4">{user.state}</td>
                <td className="px-6 py-4">
                  {convertDateFormat(user.createdAt)}
                </td>
                <td className="px-6 py-4">
                  {convertDateFormat(user.updatedAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4 font-medium">
                    <a
                      href={`/editprofile/${user._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <button
                      className="text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => {
                        handleDeleteConfirmation(user._id, index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {deleteConfirmation && (
          <Popover
            title="Confirm Deletion"
            content="Are you sure you want to delete your profile? This action cannot be undone."
            onConfirm={() => hanDeleteUser(...userToDelete)}
            onCancel={handleDeleteCancel}
          />
        )}
      </div>
    </>
  );
};

export default UserList;
