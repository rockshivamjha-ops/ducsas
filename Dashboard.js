import React from "react";

function Dashboard({ user, setUser }) {
  if (user.role === "admin") {
    return (
      <div style={{ padding: 20 }}>
        <h2>Admin Dashboard</h2>
        <p>Welcome Admin!</p>
        <button onClick={() => setUser(null)}>Logout</button>
      </div>
    );
  }

  const student = user.student;
  return (
    <div style={{ padding: 20 }}>
      <h2>Student Dashboard</h2>
      <p><b>Name:</b> {student.name}</p>
      <p><b>Application ID:</b> {student.applicationId}</p>
      <p><b>Course:</b> {student.course}</p>
      <p><b>Allotted College:</b> {student.allottedCollege}</p>
      <p><b>Contact:</b> {student.contact}</p>

      <h3>Payment History</h3>
      <ul>
        {student.paymentHistory.map((p, i) => (
          <li key={i}>
            ₹{p.amount} | {p.date} {p.time} | Txn: {p.txnId} | Mode: {p.mode}
          </li>
        ))}
      </ul>

      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}

export default Dashboard;
