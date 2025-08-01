import Navbar2 from "../../components/Navbar2";
import homePage_Image from "../../images/homePage_Image.jpg";

function Profile() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dateJoined = userInfo?.existingUser?.created_at;
  const formattedDate = new Date(dateJoined).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Navbar */}
      <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <Navbar2 Background="#64605cff" />
      </div>

      {/* Background Image */}
      <img
        src={homePage_Image}
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      {/* Page Content */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "60px",
          zIndex: 2,
        }}
      >
        {/* Grey Box */}
        <div
          style={{
            backgroundColor: "rgba(200, 200, 200, 0.9)",
            padding: "140px",
            borderRadius: "12px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            minWidth: "300px",
            textAlign: "center",
            transform: "translateY(-100px)", // 👈 Move it 100px upward
          }}
        >
          <h3>
            Welcome, {userInfo?.existingUser?.firstName}{" "}
            {userInfo?.existingUser?.lastName}
          </h3>
          <h5>Date joined : {formattedDate}</h5>
          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{ marginRight: "10px" }}
            >
              Dashboard
            </button>
            <button type="button" className="btn btn-primary btn-lg">
              Transactions
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
