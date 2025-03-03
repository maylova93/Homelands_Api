const express = require('express');
const Staff = require('../models/Staff');

const router = express.Router();

router.get('/', async (req, res) => {
    const staff = await Staff.findAll();
    res.json(staff);
});

router.post('/', async (req, res) => {
    const { name, position } = req.body;
    const staffMember = await Staff.create({ name, position });
    res.json(staffMember);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, position } = req.body;
    await Staff.update({ name, position }, { where: { id } });
    res.json({ message: "Staff updated" });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Staff.destroy({ where: { id } });
    res.json({ message: "Staff deleted" });
});

module.exports = router;
