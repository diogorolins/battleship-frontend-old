import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Snack = (props) => {
  const { openSnack, closeSnack, message, severity } = props;

  return (
    <>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeSnack} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Snack;
