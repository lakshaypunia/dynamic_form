// pushForm.js
import mongoose from "mongoose";

// 1. MongoDB URI (replace with your own or use .env with dotenv)
const MONGODB_URI = "mongodb+srv://ashgamer7885:abjd234dhjhfh@cluster0.54kdedl.mongodb.net/dynamicform ";

// 2. Schema & Model definition (can also import from your project files)
const fieldSchema = new mongoose.Schema({
  label: String,
  ui_type: String,
  value: mongoose.Schema.Types.Mixed,
});

const formSchema = new mongoose.Schema({
  fields: [fieldSchema],
});

const Form = mongoose.model("Form", formSchema);

// 3. Sample data
const sampleFields = [
 { label: "Match Stats", ui_type: "Table", value: [
      { team: "Eagles", score: 92 },
      { team: "Wolves", score: 88 },
    ]
  },
  { label: "Top Players", ui_type: "Cards", value: ["Alice", "Bob", "Charlie"] },
  { label: "Post Match Video", ui_type: "Video", value: "/highlights.mp4" },
];


// 4. Function to connect and insert
async function insertForm() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const newForm = new Form({ fields: sampleFields });
    await newForm.save();

    console.log("✅ Form inserted with ID:", newForm._id);
  } catch (error) {
    console.error("❌ Error inserting form:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 MongoDB connection closed.");
  }
}

insertForm();
