import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

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
  begin: {
    marginLeft: "20px",
  },
}));

const InvitedSent = (props) => {
  const classes = useStyles();
  const { invitesSent, beginGame } = props;

  return (
    <>
      <h1 className={classes.h1}>Convites Enviados</h1>
      <List className={classes.root}>
        {invitesSent.map((invite) => (
          <React.Fragment key={invite.to.id}>
            <ListItem className={classes.detail}>
              <ListItemText
                primary={invite.to.name}
                secondary={invite.to.email}
              />
              <ListItemText>
                {invite.status === "WAITING" && "AGUARDANDO..."}
                {invite.status === "WAITING" && (
                  <CircularProgress color="secondary" />
                )}
                {invite.status === "DECLINED" && "NÃO ACEITO"}
                {invite.status === "ACCEPTED" && "ACEITO"}
                {invite.status === "ACCEPTED" && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.begin}
                    onClick={() => beginGame(invite.game.id)}
                  >
                    Iniciar Jogo
                  </Button>
                )}
              </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default InvitedSent;
