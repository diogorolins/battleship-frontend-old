import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  headingRed: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "red",
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

const LoggedPlayers = (props) => {
  const classes = useStyles();
  const { loggedPlayers, invitePlayer, invitesSent } = props;
  return (
    <>
      <h1 className={classes.h1}>Jogadores Online</h1>
      <List className={classes.root}>
        {loggedPlayers.map((player) => (
          <React.Fragment key={player.id}>
            <ListItem className={classes.detail}>
              <ListItemText
                primary={
                  <Typography
                    className={
                      invitesSent.filter((p) => p.to.id === player.id).length >
                      0
                        ? classes.headingRed
                        : classes.heading
                    }
                  >
                    {player.name}
                  </Typography>
                }
                secondary={player.email}
              />
              <ListItemText>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => invitePlayer(player.id)}
                  disabled={
                    invitesSent.filter((p) => p.to.id === player.id).length > 0
                      ? true
                      : false
                  }
                >
                  {invitesSent.filter((p) => p.to.id === player.id).length > 0
                    ? "Enviado"
                    : "Convidar"}
                </Button>
              </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default LoggedPlayers;
