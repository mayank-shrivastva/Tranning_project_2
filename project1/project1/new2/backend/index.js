import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/dbfliket", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("DB connected");
}).catch((error) => {
  console.error("Error connecting to database:", error);
});

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  password: String
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", userSchema);

const newDataSchema = new mongoose.Schema({
  name: String,
  email: String
});

const NewData = mongoose.model("NewData", newDataSchema);

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  User.findOne({ email })
    .then(async user => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password." });
      }

      res.status(200).json({ message: "Login successful.", user });
    })
    .catch(error => {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error." });
    });
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists. Please use a different email." });
    }
    
    const userId = generateUserId();
    const newUser = new User({ userId, name, email, password });
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully. You will now receive a confirmation email." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

app.post("/newdata", async (req, res) => {
  try {
    const newData = new NewData(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    console.error("Error adding new data:", error);
    res.status(500).json({ message: "Failed to add new data" });
  }
});

app.get("/newdata", async (req, res) => {
  try {
    const newData = await NewData.find();
    res.status(200).json(newData);
  } catch (error) {
    console.error("Error fetching new data:", error);
    res.status(500).json({ message: "Failed to fetch new data" });
  }
});

app.delete("/newdata/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedData = await NewData.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully", deletedData });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Failed to delete data" });
  }
});

app.put("/newdata/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedData = await NewData.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Failed to update data" });
  }
});

function generateUserId() {
  return Math.random().toString(36).substr(2, 9);
}

app.listen(9002, () => {
  console.log("BE Started at port 9002");
});
