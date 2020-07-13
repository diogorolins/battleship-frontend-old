import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  h1: {
    paddingTop: "50px",
    paddingLeft: "5px",
    fontSize: theme.typography.pxToRem(25),
    fontWeight: theme.typography.fontWeightBold,
  },
  detail: {
    verticalAlign: "center",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const InvitedSent = (props) => {
  const classes = useStyles();
  const { invitesSent } = props;

  return (
    <>
      <h1 className={classes.h1}>Convites Enviados</h1>
      <List className={classes.root}>
        {invitesSent.map((player) => (
          <>
            <ListItem key={player.to.id} className={classes.detail}>
              <ListItemText
                primary={player.to.name}
                secondary={player.to.email}
              />
              <ListItemText>
                Status:{" "}
                {player.status === "WAITING" ? "AGUARDANDO..." : "NÃO ACEITO"}
                {player.status === "WAITING" ? (
                  <CircularProgress color="secondary" />
                ) : (
                  ""
                )}
              </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </>
  );
};

export default InvitedSent;
