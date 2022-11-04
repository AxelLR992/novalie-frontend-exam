import React, { FunctionComponent } from "react";
import User from "../../classes/User";
import { mdiDeleteOutline, mdiAccountDetails } from "@mdi/js";
import Icon from "@mdi/react";
import "../../assets/styles/grid-collection.scss";

interface IUsersGridProps {
  data: User[];
  isLoading?: boolean;
  onDelete?: (user: User) => void;
  onDetails?: (user: User) => void;
}

const UsersGrid: FunctionComponent<IUsersGridProps> = ({
  data,
  onDelete,
  onDetails,
  isLoading = false,
}) => {
  const handleDelete = (user: User) => {
    if (onDelete) onDelete(user);
  };

  const handleDetails = (user: User) => {
    if (onDetails) onDetails(user);
  };

  return (
    <div className="grid-collection">
      {isLoading && "Loading..."}
      {data.length === 0 && "No data found."}
      {data.map((user) => (
        <div className="card" key={user.id}>
          <img src={user.imageURL} alt={user.name} />
          <h2>{user.name}</h2>
          <h5>ID: {user.id}</h5>
          <p>
            Gender: {user.gender} <br />
            Status: {user.status} <br />
            Email(s):
            <ul>
              {user.emails.map((email, i) => (
                <li key={i}>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              ))}
            </ul>
          </p>
          <div className="actions">
            <button onClick={() => handleDelete(user)}>
              <Icon size={1} path={mdiDeleteOutline} />
            </button>
            <button onClick={() => handleDetails(user)}>
              <Icon size={1} path={mdiAccountDetails} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersGrid;
