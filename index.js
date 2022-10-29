import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/api/v1/product", async (req, res) => {
  try {
    const product = await prisma.product.findMany();
    res.status(200).json({ product, success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
});

app.get("/api/v1/product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findFirst({
      where: {
        sku: id,
      },
    });
    res.status(200).json({ product, success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
});

app.post("/api/v1/product/", async (req, res) => {
  const {
    name,
    sku,
    brand,
    category,
    manufacturer,
    hsnCode,
    weight,
    dimension,
  } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        sku,
        brand,
        category,
        manufacturer,
        hsnCode,
        weight,
        dimension,
      },
    });
    res.status(200).json({ product, success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
});

app.put("/api/v1/product/:id", async (req, res) => {
  const { name, brand, category, manufacturer, hsnCode, weight, dimension } =
    req.body;
  const { id } = req.params;
  try {
    const product = await prisma.product.update({
      where: { sku: id },
      data: {
        name,
        brand,
        category,
        manufacturer,
        hsnCode,
        weight,
        dimension,
      },
    });
    res.status(200).json({ product, success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
});

app.delete("/api/v1/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.delete({
      where: {
        sku: id,
      },
    });
    res.status(200).json({ product, success: true });
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running ${PORT}`));
