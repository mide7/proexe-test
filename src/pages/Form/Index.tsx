import { Link, Outlet } from "react-router-dom";

export default function FormPage() {
  return (
    <div className="container-lg mb-4">
      <Link to={"/"} className={"no-link-style"}>
        <h1 className="heading my-3">Dashboard</h1>
      </Link>
      <div className="card">
        <div className="card-header d-flex justify-content-between bg-transparent">
          <h2>Form</h2>
        </div>
        <div className="card-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
