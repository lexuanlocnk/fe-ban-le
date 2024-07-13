const LoadingGif = ({}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={"/image/loadding.gif"}
          alt="Loading GIF"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
        {/* <img
            src={logoImage}
            alt="Logo"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "50px",
              maxHeight: "50px",
            }}
          /> */}
      </div>
    </div>
  );
};

export default LoadingGif;
