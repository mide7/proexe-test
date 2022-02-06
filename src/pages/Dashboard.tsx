import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserListTable from "../components/UserListTable";
import { RootState } from "../store";

export default function Dashboard() {
  const usersList = useSelector((state: RootState) => state.users.usersList);

  return (
    <div className="container-lg mb-4">
      <h1 className="heading my-3">Dashboard</h1>
      <div className="card">
        <div className="card-header d-flex justify-content-between bg-transparent">
          <h2>User list</h2>
          <Link to={"/form/new"} className="btn btn-primary">
            Add New
          </Link>
        </div>
        <div className="overflow-auto">
          <UserListTable
            data={usersList.data}
            loading={usersList.loading}
            error={usersList.error}
            direction={usersList.direction}
          />
        </div>
      </div>
    </div>
  );
}
