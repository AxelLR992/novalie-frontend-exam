import React, { FunctionComponent } from "react";
import "../../assets/styles/list-collection.scss";
import User from "../../classes/User";
import TableCell from "../atoms/TableCell";
import { mdiDeleteOutline } from "@mdi/js";
import { mdiAccountDetails } from "@mdi/js";
import Icon from "@mdi/react";

interface IUsersListProps {
  data: User[];
  isLoading?: boolean;
  onDelete?: (user: User) => void;
  onDetails?: (user: User) => void;
}

const UsersList: FunctionComponent<IUsersListProps> = ({
  data,
  onDelete,
  onDetails,
  isLoading = false,
}) => {
  const headers = [
    "Profile picture",
    "ID",
    "Name",
    "Email",
    "Gender",
    "Status",
    "Actions",
  ];

  const handleDelete = (user: User) => {
    if (onDelete) onDelete(user);
  };

  const handleDetails = (user: User) => {
    if (onDetails) onDetails(user);
  };

  return (
    <div className="list-collection">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <TableCell colSpan={headers.length}>Loading...</TableCell>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <TableCell colSpan={headers.length}>No data found.</TableCell>
            </tr>
          ) : (
            data.map((user) => (
              <tr key={user.id}>
                <TableCell>
                  <img src={user.imageURL} alt={user.name} />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {user.emails.length === 0 && "-"}
                  {user.emails.map((email, i) => (
                    <React.Fragment key={i}>
                      <a href={`mailto:${email}`}>{email}</a>
                      <br />
                    </React.Fragment>
                  ))}
                </TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(user)}>
                    <Icon size={1} path={mdiDeleteOutline} />
                  </button>
                  <button onClick={() => handleDetails(user)}>
                    <Icon size={1} path={mdiAccountDetails} />
                  </button>
                </TableCell>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
