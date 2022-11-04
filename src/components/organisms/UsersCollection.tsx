import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import User from "../../classes/User";
import Container from "../atoms/Containter";
import UsersList from "../molecules/UsersList";
import ModeSelector from "../atoms/ModeSelector";
import ErrorHandler from "../../classes/ErrorHandler";
import Swal from "sweetalert2";
import NewUserForm from "../atoms/NewUserForm";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "../../assets/styles/collection-main.scss";
import UsersGrid from "../molecules/UsersGrid";
import UserEditForm from "../atoms/UserEditForm";

Modal.setAppElement("#root");

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 20,
  },
};

const UsersCollection: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersNextPage, setUsersNextPage] = useState<User[]>([]);

  const [page, setPage] = useState(0);
  const [mode, setMode] = useState<"list" | "grid">("list");
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<"normal" | "create" | "edit">("normal");
  const [selectedUser, setSelectedUser] = useState<User>();

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setUsers(await User.getAll({ page }));
      setUsersNextPage(await User.getAll({ page: page + 1 }));
    } catch (e) {
      const error = new ErrorHandler(e);
      toast.error(error.getMessage());
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const onUserDelete = async (user: User) => {
    const res = await Swal.fire({
      title: `Are you sure you want to delete ${user.name}?`,
      text: "This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
    });
    if (res.isConfirmed) {
      try {
        setIsLoading(true);
        await user.delete();
        await fetchUsers();
      } catch (e) {
        const error = new ErrorHandler(e);
        toast.error(error.getMessage());
      } finally {
        setIsLoading(false);
      }
    }
  };

  const afterUserSave = async (user: User) => {
    setState("normal");
    Swal.fire(`User successfully saved with ID ${user.id}.`, "", "success");
    await fetchUsers();
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Container className="collection-main">
      <ModeSelector
        collectionTitle="Users"
        onModeSelect={(mode) => setMode(mode)}
        onNewUserClick={() => setState("create")}
        selected={mode}
      />
      {mode === "list" && (
        <UsersList
          data={users}
          isLoading={isLoading}
          onDelete={onUserDelete}
          onDetails={(user) => {
            setState("edit");
            setSelectedUser(user);
          }}
        />
      )}
      {mode === "grid" && (
        <UsersGrid
          data={users}
          isLoading={isLoading}
          onDelete={onUserDelete}
          onDetails={(user) => {
            setState("edit");
            setSelectedUser(user);
          }}
        />
      )}
      <div className="pagination">
        <button onClick={prevPage} disabled={page === 0}>
          Previous page
        </button>
        <button onClick={nextPage} disabled={usersNextPage.length === 0}>
          Next page
        </button>
      </div>
      <Modal
        isOpen={state === "create" || state === "edit"}
        onRequestClose={() => setState("normal")}
        style={modalStyles}
      >
        {state === "create" && <NewUserForm callback={afterUserSave} />}
        {state === "edit" && selectedUser && (
          <UserEditForm selectedUser={selectedUser} callback={afterUserSave} />
        )}
      </Modal>
    </Container>
  );
};

export default UsersCollection;
