const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const randomstring = require("randomstring");
const generatePdfFile = require("./generatePdfFile");
const mockedData = require('./mock/proposal');

const port = 4000;
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/proposal/:proposal_id", async (_, res) => {
  try {
    res.set("Content-Type", "application/pdf");

    const fileName = path.resolve(
      __dirname,
      "..",
      "tmp",
      `${randomstring.generate()}_proposal.pdf`
    );

    const pdf = await generatePdfFile(fileName, mockedData);

    return res.send(fs.readFileSync(pdf)).end(() => fs.unlinkSync(fileName));
  } catch {
    return res.status(500).send({
      error: "interal_server_error",
      message: "Error when generating pdf",
    });
  }
});

server.listen(port, () => console.log(`Server launched on port ${port}`));
