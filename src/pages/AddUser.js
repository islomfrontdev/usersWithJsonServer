import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/actions";

export default function AddUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const [error, setError] = useState("");
  const { name, email, contact, address } = user;
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    console.log(user);
    e.preventDefault();
    if (!name || !email || !contact || !address) {
      setError("Please input all input Field");
    } else {
      dispatch(addUser(user));
      navigate("/");
      setError("");
    }
  };
  return (
    <Box
      sx={{
        mt: 10,
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>
      {error && (
        <Typography variant="h5" mt={2} color={"error"}>
          {error}
        </Typography>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "70ch",
          },
        }}
        noValidate
        autoComplete="on"
      >
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="standard"
          type={"text"}
          value={name}
          onChange={handleInputChange}
        />
        <TextField
          name="email"
          label="Email"
          variant="standard"
          type={"email"}
          value={email}
          onChange={handleInputChange}
        />
        <TextField
          id="contact"
          name="contact"
          label="Contact"
          variant="standard"
          type={"number"}
          value={contact}
          onChange={handleInputChange}
        />
        <TextField
          id="address"
          name="address"
          label="Address"
          variant="standard"
          type={"text"}
          value={address}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{
            mt: 3,
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
