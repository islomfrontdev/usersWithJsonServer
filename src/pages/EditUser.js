import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, getSingleUser, updateUser } from "../redux/actions";

export default function EditUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);
  const [error, setError] = useState("");
  const { name, email, contact, address } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id, state);
    if (!name || !email || !contact || !address) {
      setError("Please input all input Field");
    } else {
      dispatch(updateUser(state, id));
      navigate("/");
      setError("");
    }
  };
  const { user } = useSelector((state) => state.data);
  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);
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
      <Typography variant="h4" mt={2}>
        EDIT
      </Typography>
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
          value={name || ""}
          onChange={handleInputChange}
        />
        <TextField
          name="email"
          label="Email"
          variant="standard"
          type={"email"}
          value={email || ""}
          onChange={handleInputChange}
        />
        <TextField
          id="contact"
          name="contact"
          label="Contact"
          variant="standard"
          type={"number"}
          value={contact || ""}
          onChange={handleInputChange}
        />
        <TextField
          id="address"
          name="address"
          label="Address"
          variant="standard"
          type={"text"}
          value={address || ""}
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
          Update
        </Button>
      </Box>
    </Box>
  );
}
