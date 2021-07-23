import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";

export default function Letters({letters}) {
  
    const { To, From } = letters[0];
    const totalLetterI = letters.length - 1;

    return (
    <>
      <h3>correspondence</h3>
      <hr />
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography style={{ "fontVariant": "small-caps", "fontWeight": "500" }}>
              {totalLetterI > 0 && <span>from</span>}<br />{String(To).toUpperCase()}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
          <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography style={{ "fontVariant": "small-caps", "fontWeight": "500" }}>
              from<br />{String(From).toUpperCase()}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        {
          letters.map((letter, i)=>{
            return (
              <TimelineItem key={i}>
                 <TimelineOppositeContent>
                   <Typography>{ (letter.To === From) && letter.Date }</Typography>
                 </TimelineOppositeContent>
                 <TimelineSeparator>
                   <TimelineDot />
                   {(i < totalLetterI) && <TimelineConnector />}
                 </TimelineSeparator>
                 <TimelineContent>
                   <Typography>{ (letter.To !== From) && letter.Date }</Typography>
                 </TimelineContent>
               </TimelineItem>
            )
          })
        }
      </Timeline>
    </>
  );
}