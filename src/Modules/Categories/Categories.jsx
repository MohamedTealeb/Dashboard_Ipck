import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "./../../Apis/CategoryApi/CategoryApi";

export default function Categories() {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

 
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

 
  return (
    <>
      <Box sx={{ minWidth: 275, marginTop: 20 }}>
        <Card variant="outlined" sx={{ minWidth: 225 }}>
          <Typography variant="h5" component="div">
            Categories
          </Typography>
          {allCategories.map((item, index) => (
            <Card key={index} variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <img src={`${import.meta.env.VITE_IMAGEURL}/${item.image}`} alt="" />
                <span>{item.name}</span>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          ))}
        </Card>
      </Box>
    </>
  );
}
