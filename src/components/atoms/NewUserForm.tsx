import React, { FunctionComponent, useState } from "react";
import CreateUserDto from "../../classes/Dtos/CreateUserDto";
import Icon from "@mdi/react";
import { mdiPlusCircleOutline, mdiMinusCircleOutline } from "@mdi/js";
import "../../assets/styles/user-form.scss";
import User from "../../classes/User";
import ErrorHandler from "../../classes/ErrorHandler";
import { toast } from "react-toastify";

interface INewUserFormProps {
  callback?: (user: User) => void;
}

const NewUserForm: FunctionComponent<INewUserFormProps> = ({ callback }) => {
  const [user, setUser] = useState(new CreateUserDto());

  const [isSaving, setIsSaving] = useState(false);

  const handleEmailChange = (value: string, index: number) => {
    const emails = [...user.emails];
    emails[index] = value;
    setUser({ ...user, emails });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.value;
    if (status === "activo" || status === "inactivo")
      setUser({ ...user, status });
  };

  const addEmail = () => {
    const emails = [...user.emails];
    emails.push("");
    setUser({ ...user, emails });
  };

  const removeEmail = () => {
    if (user.emails.length > 1) {
      const emails = [...user.emails];
      emails.pop();
      setUser({ ...user, emails });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    const image = e.target.files[0];
    setUser({ ...user, image });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const newUser = await new CreateUserDto(user).create();
      if (callback) callback(newUser);
    } catch (e) {
      const error = new ErrorHandler(e);
      toast.error(error.getMessage());
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Create new user</h2>

      <div className="input-group">
        <label>Name</label>
        <input
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          type="text"
          required
          disabled={isSaving}
        />
      </div>
      <div className="input-group">
        <label>Gender</label>
        <input
          value={user.gender}
          onChange={(e) => setUser({ ...user, gender: e.target.value })}
          type="text"
          required
          disabled={isSaving}
        />
      </div>
      <div className="radio-buttons">
        <label>Status</label>
        <input
          value="activo"
          type="radio"
          required
          disabled={isSaving}
          checked={user.status === "activo"}
          onChange={handleStatusChange}
        />{" "}
        Active
        <input
          value="inactivo"
          type="radio"
          required
          disabled={isSaving}
          checked={user.status === "inactivo"}
          onChange={handleStatusChange}
        />{" "}
        Inactive
      </div>

      <div className="input-group">
        <label>Emails</label>
        {user.emails.map((email, i) => (
          <input
            key={i}
            value={email}
            onChange={(e) => handleEmailChange(e.target.value, i)}
            type="email"
            className="email-input"
            required
            disabled={isSaving}
          />
        ))}
        <button
          type="button"
          className="email-button"
          onClick={addEmail}
          title="Add other email"
          disabled={isSaving}
        >
          <Icon size={1} path={mdiPlusCircleOutline} />
        </button>
        <button
          type="button"
          disabled={user.emails.length === 1 || isSaving}
          className="email-button"
          onClick={removeEmail}
          title="Remove last email"
        >
          <Icon size={1} path={mdiMinusCircleOutline} />
        </button>
      </div>

      <div className="input-group">
        <label>Profile picture</label>
        <input
          type="file"
          required
          onChange={handleFileSelect}
          accept="image/png, image/jpeg"
          disabled={isSaving}
        />
      </div>

      <button className="submit-button" type="submit" disabled={isSaving}>
        Save
      </button>
    </form>
  );
};

export default NewUserForm;
