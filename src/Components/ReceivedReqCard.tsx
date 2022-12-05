import { CSSPropertiesWithMultiValues } from "@emotion/serialize";
import { Box, CardMedia, Typography, useTheme, Button } from "@mui/material";
import React, { CSSProperties, useEffect, useState } from "react";
import camera from "../Assets/Images/Film-Photography.png";
import { IRequest, IUser, IListItem } from "../Interfaces";
import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "../firebase";
import "aos/dist/aos.css";

interface Props {
  request: IRequest;
}

const ReceivedReqCard = ({ request }: Props) => {
  const [sender, setSender] = useState<IUser>();
  const [item, setItem] = useState<IListItem>();
  const theme = useTheme();

  useEffect(() => {
    getReqSender();
    getReqItem();
  }, []);

  const getReqSender = async () => {
    const data = query(collection(db, "users"));
    const req = await getDocs(data);
    req.forEach((doc) => {
      if (doc.id == request.fromUser) {
        const sender = {
          email: doc.data().email,
          displayName: doc.data().displayName,
          id: doc.id,
        };
        setSender(sender);
      }
    });
  };

  const getReqItem = async () => {
    const data = query(collection(db, "listings"));
    const req = await getDocs(data);
    req.forEach((doc) => {
      if (doc.id == request.itemId) {
        setItem({
          authorID: doc.data().authorID,
          title: doc.data().title,
          description: doc.data().description,
          image: doc.data().image,
          price: doc.data().price,
          category: doc.data().category,
          location: doc.data().location,
          id: doc.data().id,
        });
      }
    });
  };

  return (
    <Box
      sx={{
        padding: "1rem",
        boxShadow: "0px 0px 15px -3px #000000",
        width: "25rem",
        height: "15rem",
        borderRadius: theme.shape.buttonBorderRadius,
        margin: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
      }}
    >
      <CardMedia sx={[imgStyle, grid.pic]} component="img" src={camera} />
      <Typography sx={[textContainer, grid.reqFrom]}>
        <span style={titleStyle}>Request from: </span>
        {sender?.email ? sender.email : "no name"}
      </Typography>
      <Typography sx={[textContainer, grid.reqFor]}>
        <span style={titleStyle}>Request for: </span>{" "}
        {item ? item.title : "no item"}
      </Typography>
      <Typography sx={[textContainer, grid.timeFrom]}>
        <span style={titleStyle}>Time from: </span> Friday, 25 nov
      </Typography>
      <Typography sx={[textContainer, grid.timeTo]}>
        <span style={titleStyle}>Time to: </span> Sunday, 27 nov
      </Typography>
      <Typography sx={[textContainer]}>
        <span style={titleStyle}>Price total: </span> {request.priceTotal} kr
      </Typography>
      <Typography sx={[textContainer, grid.message]}>
        <span style={titleStyle}>Message: </span>Hi! I would like to rent the
        projector for a couple of days. Cheers!
      </Typography>
      <div style={buttonsContainer}>
        <Button sx={[button, decline]}>Decline</Button>
        <Button variant="contained" sx={button}>
          Accept
        </Button>
      </div>
    </Box>
  );
};

const grid = {
  pic: {
    gridColumn: "1 / 2",
    gridRow: "1 / 3",
  },
  reqFrom: {
    gridColums: "2 / 3",
  },
  timeFrom: {
    gridColumn: "3 / 4",
    gridRow: "1 / 2",
  },
  reqFor: {
    gridColumn: "2 / 3",
    gridRow: "2 / 3",
  },
  timeTo: {
    gridColumn: "3 / 4",
    gridRow: "2 / 3",
  },
  message: {
    gridColumn: "1 / 3",
    gridRow: "3 / 4",
  },
  price: {
    gridColumn: "3 / 4",
    gridRow: "3 / 5",
  },
};

const imgStyle = {
  height: "auto",
  width: "auto",
  objectFit: "scale-down",
  marginRight: "1rem",
};

const titleStyle: CSSProperties = {
  color: "grey",
};

const textContainer: CSSPropertiesWithMultiValues = {
  display: "flex",
  flexDirection: "column",
};

const buttonsContainer = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gridColumn: "1 / 4",
};

const button = {
  width: "5rem",
  height: "2rem",
  border: "none",
  color: "white",
};

const decline = {
  backgroundColor: "red",
};

export default ReceivedReqCard;
