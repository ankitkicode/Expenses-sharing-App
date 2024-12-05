const express = require('express');
const { addExpense, getExpenses } = require('../controllers/expense');
const router = express.Router();

router.post("/add",addExpense);
router.get("/get",getExpenses);







module.exports = router;