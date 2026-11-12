import Database from "better-sqlite3";

const db = new Database("./data/sports.db");

export const getEquipmentbyId = (id) => {
  return db.prepare(`SELECT * FROM equipments WHERE id = ?`).get(id);
};

export const getEquipmentbyCategory = (category) => {
  return db
    .prepare(`SELECT * FROM equipments WHERE category = ?`)
    .all(category);
};

export const editEquipment = (id, name, category, brand, price, quantity) => {
  return db
    .prepare(
      `UPDATE equipments SET name = ?, category = ?, brand = ?, price = ?, quantity = ? WHERE id = ?`
    )
    .run(id, name, category, brand, price, quantity);
};

export const deleteEquipment = (id) => {
  return db.prepare(`DELETE FROM equipments WHERE id = ?`).run(id);
};
