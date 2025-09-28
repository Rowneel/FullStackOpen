const Notification = ({ error = false, message }) => {
  if (message === null) {
    return null;
  }

  const style = error ? "error" : "success";

  return <div className={style}>{message}</div>;
};

export default Notification;
