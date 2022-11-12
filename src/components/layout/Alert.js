import { Fragment } from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alert = useSelector((state) => state.alert);
  return (
    <>
      {alert !== null &&
        alert.length > 0 &&
        alert.map((alr) => (
          <section className="container">
            <div key={alr.id} className={`alert alert-${alr.type}`}>
              {alr.msg}
            </div>
          </section>
        ))}
    </>
  );
};

export default Alert;
