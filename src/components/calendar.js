import React, { useState, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
// import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import CustomLink from "./customLink";
import CustomListItem from "./customListItem";
import CustomAutoComplete from "./customAutoComplete";
import {
  TextField,
  Typography,
  DialogContent,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Chip,
  List,
} from "./materialUiComponents";
import { addEventToDb, getEvents } from "../utils/serverCalls";
import MUIModal from "./MUIModal";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  dialogContent: {
    display: "block",
  },
  textField: {
    display: "block",
    marginBottom: "20px",
  },
  mr20: {
    marginRight: "20px",
  },
  displayBlock: {
    display: "block",
  },
  listContainer: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    maxWidth: "120px",
    maxHeight: "20px",
    fontSize: "10px",
  },
}));

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const Calendar = () => {
  const classes = useStyles();

  const [dateObj, setDateObj] = useState({});
  const [today, setToday] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setDescription] = useState("");
  const [eventType, setEventType] = useState("event");
  const [eventStartTime, setEventStartTime] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [eventEndTime, setEventEndTime] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [eventDetails, setEventDetails] = useState({});
  const [eventsList, setEventsList] = useState([]);
  const [eventsListForSearch, setEventsListForSearch] = useState([]);
  const [dayModalOpen, setDayModalOpen] = useState(false);
  const [currentDayEvents, setCurrentDayEvents] = useState([]);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [currentMonthEvents, setCurrentMonthEvents] = useState([]);
  // const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setDateObj(moment());
    getEventsAndSetState();
  }, []);

  // useEffect(() => {}, [searchText]);

  const getEventsAndSetState = () => {
    getEvents()
      .then((events) => {
        setEventsList(events);
        setEventsListForSearch(events);
      })
      .catch((err) => {
        alert("There was some problem loading events");
      });
  };

  // const weekdays = moment.weekdays(); // Days in week
  const weekdayshort = moment.weekdaysShort(); // Shorthand for days in a week

  const month = moment(dateObj).month();
  const year = moment(dateObj).year();

  const getDaysInMonth = () => {
    return moment(dateObj).daysInMonth();
  };
  const currentDate = () => {
    return moment(dateObj).get("date");
  };
  const currentDay = () => {
    return moment(dateObj).format("D");
  };

  const firstDayOfMonth = () => {
    let firstDay = moment(dateObj).startOf("month").format("d"); // Day of week 0...1..5...6
    return firstDay;
  };

  const lastDayOfMonth = () => {
    let lastDay = moment(dateObj).endOf("month").format("d");
    return lastDay;
  };

  const weekDays = weekdayshort.map((day) => {
    return (
      <td key={day} className="week-day">
        {day}
      </td>
    );
  });

  const lastNDayOfThePreviousMonth = (index) => {
    return moment(dateObj)
      .date((index - 1) * -1)
      .format("DD");
  };

  const getLastNdaysOfThePreviousMonth = (index) => {
    // const isSunday = moment(dateObj).
    return (
      <td key={Math.random(4440)} className="empty-slot">
        {lastNDayOfThePreviousMonth(index)}
      </td>
    );
  };

  const prevMonthDates = [];
  for (let i = firstDayOfMonth(); i > 0; i--) {
    prevMonthDates.push(getLastNdaysOfThePreviousMonth(i));
  }

  const nextMonthDates = [];
  for (let i = 1; i <= 7 - (parseInt(lastDayOfMonth()) + 1); i++) {
    nextMonthDates.push(
      <td key={Math.random(4440)} className="empty-slot">
        {i}
      </td>
    );
  }

  const handleAutoCompleteChange = (value) => {
    // setSearchText(value);
    console.log(value);
    const searchText = value.toLowerCase();
    var currentList = JSON.parse(JSON.stringify(eventsListForSearch));
    var updatedList = [];
    if (value !== "") {
      updatedList = currentList.filter(
        (event) => event.eventName.toLowerCase().search(searchText) !== -1
      );
    } else {
      updatedList = currentList;
    }
    setEventsList(updatedList);
  };

  const handleOnCellClick = (e, day) => {
    const selectedDateInISOFormat = `${year}/${month + 1}/${day}`;
    setSelectedDate(selectedDateInISOFormat);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAddOrEdit = () => {
    const eventDetails = {
      eventName,
      eventDescription,
      eventType,
      eventStartTime,
      eventEndTime,
      selectedDate,
      month: moment(selectedDate).format("M"),
      year: moment(selectedDate).format("YYYY"),
      id: `${selectedDate}-${eventStartTime}`,
    };
    setEventDetails(eventDetails);
    setModalOpen(false);
    addEventToDb(eventDetails)
      .then((success) => {
        console.log("Saved successfully");
        getEventsAndSetState();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEventTitleChange = (e) => {
    setEventName(e.target.value);
  };

  const handleOnDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRadioChange = (e) => {
    setEventType(e.target.value);
  };

  const handleEventStartTimeChange = (time) => {
    setEventStartTime(time);
  };

  const handleEventEndTimeChange = (time) => {
    setEventEndTime(time);
  };

  const onMoreClick = (event, currentDayEvents) => {
    setDayModalOpen(true);
    setCurrentDayEvents(currentDayEvents);
    // showAllEvents(currentDayEvents);
  };

  const getCurrentMonthEventsByDateOrMonth = (
    currentDate,
    currentMonth,
    currentYear
  ) => {
    let currentMonthEvents = [];
    if (eventsList && eventsList.length !== 0) {
      currentMonthEvents = eventsList.map((event) => {
        if (event && currentDate) {
          if (event.selectedDate === currentDate) {
            return event;
          }
        } else if (event && currentMonth) {
          if (event.month === currentMonth && event.year === currentYear) {
            return event;
          }
        }
      });
    }
    return currentMonthEvents;
  };

  const daysInMonth = [];
  for (let i = 1; i <= getDaysInMonth(); i++) {
    let className = i == currentDay() ? "day current-day" : "day";
    const currentDate = `${year}/${month + 1}/${i}`;
    const currentMonthEvents = getCurrentMonthEventsByDateOrMonth(
      currentDate,
      null,
      null
    );
    const groupedBySelectedDate = _.groupBy(currentMonthEvents, "selectedDate");
    const currentDayEvents = groupedBySelectedDate[currentDate];
    // console.log(moment(eventDetails.selectedDate).format("D"));
    daysInMonth.push(
      <td
        onClick={(e) => {
          handleOnCellClick(e, i);
        }}
        className={className}
      >
        <div>{i}</div>
        {currentDayEvents &&
          currentDayEvents.map((event, index) => {
            if (index < 3) {
              return (
                <Chip
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEventModalOpen(true);
                    setCurrentEvent(event);
                  }}
                  label={event.eventName}
                  className={classes.chip}
                />
              );
            } else if (index === 3) {
              return (
                <CustomLink
                  onClick={() => onMoreClick(event, currentDayEvents)}
                >
                  More
                </CustomLink>
              );
            } else {
              return null;
            }
          })}
      </td>
    );
  }

  const totalSlots = [...prevMonthDates, ...daysInMonth, ...nextMonthDates];
  let rows = [];
  let cells = [];

  totalSlots.forEach((slot, index) => {
    if (index % 7 !== 0) {
      cells.push(slot);
    } else {
      let insertRow = cells.slice();
      rows.push(insertRow);
      cells = [];
      cells.push(slot);
    }
    if (index === totalSlots.length - 1) {
      let insertRow = cells.slice();
      rows.push(insertRow);
    }
  });

  const dateRowElements = rows.map((data, index) => {
    return <tr key={Math.random(1000)}>{data}</tr>;
  });

  const getNextMonthView = () => {
    setDateObj(moment(dateObj).add(1, "months"));
  };

  const getPreviousMonthView = () => {
    setDateObj(moment(dateObj).subtract(1, "months"));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            size="lg"
            style={{ marginRight: "30px", cursor: "pointer" }}
            onClick={(e) => getPreviousMonthView()}
          />
          <FontAwesomeIcon
            icon={faAngleRight}
            size="lg"
            style={{ cursor: "pointer" }}
            onClick={(e) => getNextMonthView()}
          />
          <span style={{ marginLeft: "30px" }}>
            {moment(dateObj).format("MMMM")}
          </span>
          <span style={{ marginLeft: "10px" }}>
            {moment(dateObj).format("YYYY")}
          </span>
        </div>
        <div>
          <CustomAutoComplete
            events={getCurrentMonthEventsByDateOrMonth(
              null,
              moment(dateObj).format("M"),
              moment(dateObj).format("YYYY")
            )}
            handleOnChange={_.debounce(handleAutoCompleteChange, 500)}
          />
        </div>
      </div>
      <table className="calendar">
        <thead>
          <tr className="calendar-header"></tr>
        </thead>
        <tbody>
          <tr>{weekDays}</tr>
          {dateRowElements}
        </tbody>
      </table>
      {modalOpen && (
        <MUIModal
          open={modalOpen}
          onClose={handleModalClose}
          selectedDate={selectedDate}
          onAddOrEdit={handleAddOrEdit}
          fullWidth={true}
          modalHeader={`Enter event/reminder details for ${selectedDate}`}
          showActionBtn={true}
          actionName={"Add"}
        >
          <DialogContent className={classes.dialogContent}>
            <TextField
              label="Event name"
              fullWidth
              onChange={handleEventTitleChange}
              value={eventName}
              className={classes.textField}
            />
            <TextField
              label="Event description"
              fullWidth
              className={classes.textField}
              placeholder="MultiLine with rows: 2 and rowsMax: 4"
              multiline
              rows={2}
              rowsMax={4}
              onChange={handleOnDescriptionChange}
              value={eventDescription}
            />
            <FormControl className={classes.displayBlock} component="fieldset">
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup
                aria-label="eventType"
                name="eventType"
                value={eventType}
                onChange={handleRadioChange}
                className={classes.textField}
              >
                <FormControlLabel
                  value="event"
                  control={<BlueRadio />}
                  label="Event"
                />
                <FormControlLabel
                  value="reminder"
                  control={<BlueRadio />}
                  label="Reminder"
                />
              </RadioGroup>
            </FormControl>
            <MuiPickersUtilsProvider
              // className={classes.textField}
              utils={DateFnsUtils}
            >
              <KeyboardTimePicker
                // margin="normal"
                id="start-time-picker"
                label="Start time"
                className={classes.mr20}
                value={eventStartTime}
                onChange={handleEventStartTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                // margin="normal"
                id="end-time-picker"
                label="End time"
                className={classes.mr20}
                value={eventEndTime}
                onChange={handleEventEndTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
        </MUIModal>
      )}
      {dayModalOpen && (
        <MUIModal
          open={dayModalOpen}
          onClose={() => setDayModalOpen(false)}
          fullWidth={true}
          modalHeader={"Events list"}
          showActionBtn={false}
        >
          <DialogContent className={classes.dialogContent}>
            <div className={classes.root}>
              <List component="nav" aria-label="main mailbox folders">
                {currentDayEvents.map((event) => {
                  return (
                    <>
                      <CustomListItem event={event}></CustomListItem>
                    </>
                  );
                })}
              </List>
            </div>
          </DialogContent>
        </MUIModal>
      )}
      {eventModalOpen && (
        <MUIModal
          open={eventModalOpen}
          onClose={() => setEventModalOpen(false)}
          fullWidth={true}
          modalHeader={"Event details"}
          showActionBtn={false}
        >
          <DialogContent className={classes.dialogContent}>
            <CustomListItem event={currentEvent}></CustomListItem>
          </DialogContent>
        </MUIModal>
      )}
    </div>
  );
};

export default Calendar;
