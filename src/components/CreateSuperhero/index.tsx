import React, { useState } from "react";
import { TextField, Button, Slider, Typography, Container, Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./style.css";

const comic = createTheme({
  typography: {
    fontFamily: '"Bangers", cursive, sans-serif',
  },
});

interface Superhero {
  name: string;
  superpower: string;
  humility: number;
}

const AddSuperhero: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [superpower, setSuperpower] = useState<string>("");
  const [humility, setHumility] = useState<number>(5);

  const handleSubmit = async () => {
    const newHero: Superhero = { name, superpower, humility };

    try {
      const response = await fetch("http://localhost:3000/superhero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHero),
      });

      if (!response.ok) {
        throw new Error("Failed to save superhero");
      }

      const savedHero = await response.json();
      console.log("Hero saved:", savedHero);

      setName("");
      setSuperpower("");
      setHumility(5);
    } catch (error) {
      console.error("Error saving superhero:", error);
    }
  };

  return (
    <ThemeProvider theme={comic}>
      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Paper elevation={0} className="form-container" style={{ padding: "20px", borderRadius: "16px"  }}>
          <Typography variant="h5" gutterBottom>
            Add a New Superhero
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Superpower"
            value={superpower}
            onChange={(e) => setSuperpower(e.target.value)}
            margin="normal"
          />
          <Typography gutterBottom>Humility Score</Typography>
          <Slider
            value={humility}
            onChange={(_, newValue) => setHumility(newValue as number)}
            step={1}
            marks
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: "20px" }}
            fullWidth
          >
            Add Superhero
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AddSuperhero;
