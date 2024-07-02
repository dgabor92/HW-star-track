const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

const dataFilePath = "./checklist.json";

const readData = () => {
  return JSON.parse(fs.readFileSync(dataFilePath));
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.get("/checklists", (req, res) => {
  const data = readData();
  if (data) {
    res.send(data);
  } else {
    res.status(404).send("Checklist not found");
  }
});

app.get("/check/start/:driveNumber", (req, res) => {
  const data = readData();
  const checklist = data.checklist.find(
    (checklist) => checklist.driveNumber === req.params.driveNumber
  );
  if (checklist) {
    res.send(checklist);
  } else {
    res.status(404).send("Checklist not found");
  }
});

app.put("/check/start/:driveNumber", (req, res) => {
  const driveNumber = req.params.driveNumber;
  let data = readData(); // Assuming readData() reads the JSON file and returns its content.

  const index = data.checklist.findIndex(
    (item) => item.driveNumber === driveNumber
  );

  if (index !== -1) {
    // Update the checklist item with the request body
    data.checklist[index] = { ...data.checklist[index], ...req.body };

    // Overwrite the JSON file with the updated data
    writeData(data); // Assuming writeData(data) writes the updated data back to the JSON file.

    res.send(data.checklist[index]);
  } else {
    res.status(404).send("Checklist not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
