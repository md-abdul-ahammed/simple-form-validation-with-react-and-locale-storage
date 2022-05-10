import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Dashboard = () => {
  const { userEmail } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  //get all users from local storage
  useEffect(() => {
    const getAllUser = JSON.parse(localStorage.getItem("users"));
    setUsers(getAllUser);
    setLoading(false);
  }, [deleted]);

  //   // get current user
  const currentUser = users?.filter((user) => user.email === userEmail);

  //   //remove user
  const handleDeleteUser = (email) => {
    const deleteUser = users.filter((user) => user.email !== email);
    localStorage.setItem("users", JSON.stringify(deleteUser));
    setDeleted(true);
  };

  console.log(users);

  return (
    <div>
      {loading ? (
        "Loading"
      ) : (
        <table style={{ width: "100%" }}>
          {currentUser[0].type === "2" ? (
            //if user it will show
            <>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Type</td>
              </tr>
              <tr>
                <td>
                  {currentUser[0].firstName} {currentUser[0].lastName}
                </td>
                <td>{currentUser[0].email}</td>
                <td>{currentUser[0].phone}</td>
                <td>{currentUser[0].type === "2" ? "user" : "admin"}</td>
              </tr>
            </>
          ) : (
            // if admin it will show
            <>
              <tr>
                <td style={{ fontWeight: "bold" }}>User Name</td>
                <td style={{ fontWeight: "bold" }}>User Email</td>
                <td style={{ fontWeight: "bold" }}>User Phone</td>
                <td style={{ fontWeight: "bold" }}>User Type</td>
                <td style={{ fontWeight: "bold" }}>Delete User</td>
              </tr>
              {users?.map((user, i) => (
                <tr key={i}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.type === "2" ? "user" : "admin"}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.email)}>
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
          <Link to="/login">Logout</Link>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
