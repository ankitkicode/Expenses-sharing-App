const Expense = require('../models/Exepense');

const addExpense = async (req, res) => {
    const { type } = req.body;
    try {
        if (type === "equally") {
            await divideExpenseEqually(req, res);
        } else if (type === "unequally") {
            await divideExpenseUnequally(req, res);
        } else if (type === "percentage") {
            await divideExpensePercentage(req, res);
        } else {
            return res.status(400).send("Invalid type");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
};
const divideExpenseEqually = async (req, res) => {
    const { amount, users, name, type } = req.body;

    if (!amount || !users || !name) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const userCount = users.length;
    const amountPerUser = parseFloat((amount / userCount).toFixed(2));

    try {
        const expense = new Expense({
            amount,
            type,
            loginUser: name,
            users: users.map(user => ({ name: user, balance: amountPerUser })),
        });
        await expense.save();
        res.status(201).json({
            message: "Expense added successfully",
            expense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
};
const divideExpenseUnequally = async (req, res) => {
    const { amount, users, name, value } = req.body;

    if (!amount || !users || !name || !value) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const amountPerUserArray = value.split(",").map(Number);
    const userCount = users.length;

    if (userCount !== amountPerUserArray.length) {
        return res.status(400).json({ message: "Mismatch between users counts and amounts provided" });
    }

    const totalAmount = amountPerUserArray.reduce((acc, curr) => acc + curr, 0);

    if (totalAmount !== parseFloat(amount)) {
        return res.status(400).json({ message: "Total amount does not match the sum of user amounts" });
    }

    try {
        const allUsersData = users.map((user, index) => ({ name: user, balance: amountPerUserArray[index] }));
        const expense = new Expense({
            amount,
            loginUser: name,
            type: "unequally",
            users: allUsersData
        });
        await expense.save();
        res.status(201).json({
            message: "Expense added successfully",
            expense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
};
const divideExpensePercentage = async (req, res) => {
    const { amount, users, name, value } = req.body;

    if (!amount || !users || !name || !value) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const percentageArray = value.split(",").map(Number);
    const userCount = users.length;

    if (userCount !== percentageArray.length) {
        return res.status(400).json({ message: "Mismatch between users counts and percentages provided" });
    }

    const totalPercentage = percentageArray.reduce((acc, curr) => acc + curr, 0);
    if (totalPercentage !== 100) {
        return res.status(400).json({ message: "Percentages does not macth! You enter percentage and total percentage (100) not equal." });
    }

    try {
        const allUsersData = users.map((user, index) => ({
            name: user,
            balance: parseFloat((amount * (percentageArray[index] / 100)).toFixed(2))
        }));
        const expense = new Expense({
            amount,
            loginUser: name,
            type: "percentage",
            users: allUsersData
        });
        await expense.save();
        res.status(201).json({
            message: "Expense added successfully",
            expense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
};
 
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find()

          res.status(200).json({
            success: true,
            expenses
          });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}


module.exports = {
    addExpense,
    getExpenses
};
