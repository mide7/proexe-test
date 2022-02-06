import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllUsers, setUserDataDirection } from "../features/users";
import { getRandomString, sortTableByUsername } from "../utils/helpers";
import { dir, User } from "../utils/interfaces";
import DeleteUserModal from "./DeleteUserModal";

interface Props {
  data: User[];
  error?: any;
  loading?: boolean;
  direction: dir;
}
export default function UserListTable({
  data,
  error,
  loading,
  direction,
}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSort() {
    if (direction === dir.NONE) {
      dispatch(setUserDataDirection(dir.ASC));
      dispatch(setAllUsers(sortTableByUsername(data, dir.ASC)));
    } else if (direction === dir.ASC) {
      dispatch(setUserDataDirection(dir.DESC));
      dispatch(setAllUsers(sortTableByUsername(data, dir.DESC)));
    } else {
      dispatch(setUserDataDirection(dir.NONE));
      dispatch(setAllUsers(sortTableByUsername(data, dir.NONE)));
    }
  }

  if (error)
    return (
      <div className="text-danger m-3">
        {error}.{" "}
        <button
          type="button"
          className="strippedBtn"
          onClick={() => window.location.reload()}
        >
          Try reloading
        </button>
      </div>
    );

  if (loading) return <div className="m-3">Loading...</div>;

  if (data.length < 1) return <div className="m-3">No Users Found</div>;

  return (
    <table className="table">
      <thead className="table-light">
        <tr className="text-capitalize">
          <th>id</th>
          <th>name</th>
          <th className="cursor-pointer position-relative" onClick={handleSort}>
            username
            <span className="sort-container">
              <span className={direction === dir.ASC ? "" : "text-muted"}>
                {"^"}
              </span>
              <span
                className={
                  direction === dir.DESC
                    ? "sort-caret-rotate-180"
                    : "text-muted sort-caret-rotate-180"
                }
              >
                {"^"}
              </span>
            </span>
          </th>
          <th>email</th>
          <th>city</th>
          <th>edit</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => {
          return (
            <tr key={index}>
              <td>{user?.id}</td>
              <td>{user?.name}</td>
              <td>{user?.username} </td>
              <td>{user?.email}</td>
              <td>{user?.address?.city}</td>
              <td>
                <button
                  onClick={() =>
                    navigate("/form/edit", { state: { data: user } })
                  }
                  className="btn btn-warning"
                >
                  Edit
                </button>
              </td>
              <td>
                <DeleteUserModal
                  id={user?.id}
                  randomId={getRandomString(8)}
                  name={user?.name}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
