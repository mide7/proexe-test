import { toast } from "react-toastify";

const CustomError = ({ error }: { error: string }) => {
  return (
    <>
      <div className="flex flex-col">
        <h4 className="font-bold"> Error</h4>
        <div>{error}</div>
      </div>
    </>
  );
};
const CustomSuccess = ({ success }: { success: string }) => {
  return (
    <>
      <div className="flex flex-col">
        <h4 className="font-bold">Notification</h4>
        <div>{success}</div>
      </div>
    </>
  );
};
const CustomInfo = ({ info }: { info: string }) => {
  return (
    <>
      <div className="flex flex-col">
        <h4 className="font-bold">Notification</h4>
        <div>{info}</div>
      </div>
    </>
  );
};

export const notifyError = (error: string) =>
  toast.error(<CustomError error={error} />);
export const notifySuccess = (success: string) =>
  toast.success(<CustomSuccess success={success} />);
export const notifyInfo = (info: string) =>
  toast.info(<CustomInfo info={info} />);
