// models/Form.js
import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  label: String,
  ui_type: String,
  value: mongoose.Schema.Types.Mixed
});

const FormSchema = new mongoose.Schema({
  fields: [FieldSchema]
});

export default mongoose.models.Form || mongoose.model("Form", FormSchema);
