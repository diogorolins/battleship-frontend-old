import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  h1: {
    paddingTop: "10px",
    paddingLeft: "5px",
    fontSize: theme.typography.pxToRem(25),
    fontWeight: theme.typography.fontWeightBold,
  },
  detail: {
    verticalAlign: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  deny: {
    marginLeft: "5px",
  },
}));

const InvitesReceived = (props) => {
  const classes = useStyles();
  const { invitesReceived, declineInvite, acceptInvite } = props;

  return (
    <div className={classes.root}>
      <h1 className={classes.h1}>Convites Recebidos</h1>

      {invitesReceived &&
        invitesReceived.map((invite) => (
          <Accordion key={invite.from.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {invite.from.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
              <Typography>{invite.from.email}</Typography>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => acceptInvite(invite.id)}
                >
                  Aceitar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.deny}
                  onClick={() => declineInvite(invite.id)}
                >
                  Negar
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
};

export default InvitesReceived;
