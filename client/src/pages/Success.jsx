import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    > <p>Payment accept</p>
     <Link to="/"> <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage </button></Link>
    </div>
  );
};

export default Success;