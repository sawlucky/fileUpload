const express = require("express");
const ejs = require("ejs");
const app = express();
const multer = require("multer");
const path = require("path");

const PORT = 5050;
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("homepage");
});

app.post("/upload", upload.single("profile"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
