import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import { ListItem, Typography, Divider } from "./materialUiComponents";

const useStyles = makeStyles((theme) => ({
  displayBlock: {
    display: "block",
  },
}));

const CustomListItem = ({ event }) => {
  const classes = useStyles();
  return (
    <div>
      <ListItem className={classes.displayBlock}>
        <Typography className={classes.displayBlock} variant="h5">
          {event.eventType}
        </Typography>
        <Typography className={classes.displayBlock} variant="subtitle1">
          {event.eventName} from{" "}
          {moment(event.eventStartTime).format("hh:mm A")} to{" "}
          {moment(event.eventEndTime).format("hh:mm A")}
        </Typography>
        <Typography className={classes.displayBlock} variant="subtitle2">
          {event.eventDescription}
        </Typography>
      </ListItem>
      <Divider />
    </div>
  );
};

export default CustomListItem;
