import * as db from "./data/db.js";
import express from "express";

const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/api/equipment/:id", (req, res) => {
  const id = +req.params.id;
  const equipment = db.getEquipmentbyId(id);

  if (!equipment) {
    return res.status(404).json({ message: "Equipment not found." });
  }

  return res.status(200).json(equipment);
});

app.get("/api/equipment/:category", (req, res) => {
  const category = req.params.category;
  const equipment = db.getEquipmentbyCategory(category);

  if (!equipment) {
    return res.status(404).json({ message: "Equipment not found." });
  }

  return res.status(200).json(equipment);
});

app.put("/api/equipment/:id", (req, res) => {
  const id = +req.params.id;
  const equipment = db.getEquipmentbyId(id);
  const { name, category, brand, price, quantity } = req.body;

  if (!equipment) {
    return res.status(404).json({ message: "Equipment not found." });
  }

  if (
    !name ||
    !category ||
    !brand ||
    !price ||
    !quantity ||
    name == null ||
    category == null ||
    brand == null ||
    price <= 0 ||
    quantity < 0
  ) {
    res.status(400).json({ message: "ERROR" });
  }

  db.editEquipment(id, name, category, brand, price, quantity);

  return res.status(200).json({ message: "Equipment successfully updated." });
});

app.delete("/api/equipment/:id", (req, res) => {
  const id = +req.params.id;
  const equipment = db.getEquipmentbyId(id);

  if (!equipment) {
    return res.status(404).json({ message: "Equipment not found." });
  }

  db.deleteEquipment(id);

  res.status(200).json({ message: "Equipment successfully deleted." });
});

app.listen(PORT, () => {
  console.log(`A szerver fut a ${PORT}-es PORTON`);
});
