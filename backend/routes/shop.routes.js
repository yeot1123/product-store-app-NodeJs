const express = require('express');
const router = express.Router();
const db = require('../models');
const Shop = db.Shop;

// สร้างร้านค้าใหม่
router.post('/createshop', async (req, res) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ดึงร้านค้าทั้งหมด
router.get('/', async (req, res) => {
  try {
    const shops = await Shop.findAll();
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ดึงร้านค้ารายเดียว
router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findByPk(req.params.id);
    if (shop) {
      res.json(shop);
    } else {
      res.status(404).json({ error: 'Shop not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// แก้ไขร้านค้า
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Shop.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedShop = await Shop.findByPk(req.params.id);
      res.json(updatedShop);
    } else {
      res.status(404).json({ error: 'Shop not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ลบร้านค้า
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Shop.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Shop deleted' });
    } else {
      res.status(404).json({ error: 'Shop not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
