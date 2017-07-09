import React from 'react';

const Attendance = (props) => {
  const { audience } = props;
  const members = audience.map(member => (
    <tr key={member.id}>
      <td>{member.name}</td>
      <td>{member.id}</td>
    </tr>
  ));

  return (
    <div>
      <h2>Attendance - {audience.length} members</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Member Name</th>
            <th>Socket ID</th>
          </tr>
        </thead>
        <tbody>
          {members}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
