const express = require('express');
const router = express.Router();
const db = require('../models');
const Product = db.Product;
const Shop = db.Shop;

// ✅ CREATE: เพิ่มสินค้าใหม่ (ต้องมี shop_id)
router.post('/createproduct', async (req, res) => {
  try {
    const { name, price, shopId } = req.body;
    const shop = await Shop.findByPk(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    const product = await Product.create({ name, price, ShopId: shopId });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ READ: ดึงสินค้าทั้งหมด
router.get('/getproducts', async (req, res) => {
  try {
    const products = await Product.findAll({ include: Shop });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ READ: ดึงสินค้าตาม ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Shop });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE: แก้ไขสินค้า
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE: ลบสินค้า
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
