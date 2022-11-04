import React, { FunctionComponent, useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiPlusCircleOutline, mdiMinusCircleOutline } from "@mdi/js";
import "../../assets/styles/user-form.scss";
import User from "../../classes/User";
import ErrorHandler from "../../classes/ErrorHandler";
import { toast } from "react-toastify";
import UpdateUserDto from "../../classes/Dtos/UpdateUserDto";

interface IUserEditFormProps {
  callback?: (user: User) => void;
  selectedUser: User;
}

const UserEditForm: FunctionComponent<IUserEditFormProps> = ({
  callback,
  selectedUser,
}) => {
  const [user, setUser] = useState(new UpdateUserDto());

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
      const updatedUser = await new UpdateUserDto(user).update();
      if (callback) callback(updatedUser);
    } catch (e) {
      const error = new ErrorHandler(e);
      toast.error(error.getMessage());
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const loadUserToDTO = async () => {
      const dto = new UpdateUserDto();
      dto.emails = selectedUser.emails;
      dto.name = selectedUser.name;
      dto.id = selectedUser.id;
      dto.status = selectedUser.status;
      dto.gender = selectedUser.gender;
      // Statics have cors issue in server-side. In consequence, I have to require a new image on update
      // dto.image = await selectedUser.getImageFromURL();
      setUser(dto);
    };

    loadUserToDTO();
  }, [selectedUser]);

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>
        User #{selectedUser.id} details - {selectedUser.name}
      </h2>

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
          onChange={handleFileSelect}
          accept="image/png, image/jpeg"
          disabled={isSaving}
          required
        />
      </div>

      <button className="submit-button" type="submit" disabled={isSaving}>
        Update
      </button>
    </form>
  );
};

export default UserEditForm;
