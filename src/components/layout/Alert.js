import { useSelector } from "react-redux";

const Alert = () => {
  const alert = useSelector((state) => state.alert);

  alert !== null &&
    alert.length > 0 &&
    alert.map((alr) => (
      <div key={alr.id} className={`alert alert-${alr.type}`}>
        {alr.msg}
      </div>
    ));
};

export default Alert;
