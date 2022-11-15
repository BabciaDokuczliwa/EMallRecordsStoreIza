import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./albumsCard.css";

function AlbumsCard() {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(require("../data/albums.JSON"));
      const json = await res.json();
      setData(json.albums);
    };
    fetchData();
  }, [setData]);

  let inputHandler = (e) => {
    //convert input text to lower case
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  let handleChange = (e) => {
    setSort(e.target.value);
    if (e.target.value === 1) {
      setData(data.sort((a, b) => a.name.localeCompare(b.name)));
    } else if (e.target.value === 2) {
      setData(data.sort((a, b) => b.name.localeCompare(a.name)));
    } else if (e.target.value === 3) {
      setData(data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
    } else if (e.target.value === 4) {
      setData(data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
    }
  };
  let filteredData = data.filter((el) => {
    //if no input the return the original
    if (inputText === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.name.toLowerCase().includes(inputText);
    }
  });
  return (
    <div className="list-wrap">
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Search"
          onChange={inputHandler}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Sort"
              onChange={handleChange}
            >
              <MenuItem value={1}>Name A-Z</MenuItem>
              <MenuItem value={2}>Name Z-A</MenuItem>
              <MenuItem value={3}>Price lower first</MenuItem>
              <MenuItem value={4}>Price higher first</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <ul>
        {filteredData.map((album) => (
          <li key={album.name} className="album-li">
            <div className="img">
              <img
                src={album.image.find((img) => img.size === "large").text}
                alt="album"
              />
            </div>
            <div className="paragraf">
              <p className="name">{album.name}</p>
              <p>{album.artist.name}</p>
              <p className="price">{album.price}$</p>
              <button>Want it!</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumsCard;
