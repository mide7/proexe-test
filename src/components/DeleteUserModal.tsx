import { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/users";
import { notifyError, notifySuccess } from "./Toastify/notification";

interface deleteUserModalProps {
  id: number;
  name: string;
  randomId: string;
}

export default function DeleteUserModal({
  id,
  name,
  randomId,
}: deleteUserModalProps) {
  const dispatch = useDispatch();
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  async function handleDelete(id: number) {
    try {
      dispatch(deleteUser(id));
      notifySuccess("User Deleted Successfully");
    } catch (error: any) {
      notifyError(error.message);
    } finally {
      cancelBtnRef.current?.click();
    }
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target={`#${randomId}`}
      >
        Delete
      </button>

      <div
        className="modal fade"
        id={randomId}
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby={`${randomId}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${randomId}Label`}>
                Are you sure?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              This action will permanently remove {name} and cannot be undone.
            </div>
            <div className="modal-footer">
              <button
                ref={cancelBtnRef}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
