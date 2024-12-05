import { useState, createContext, useEffect } from "react";
import axios from "axios";

const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        type: "",
        users: [],
        value: "",
      });
    const [allExpenses, setAllExpenses] = useState([]);
    const [inputUsers, setInputUser] = useState(["aman", "ajay", "abhay"]);
    
    const addUser = (e) => {
      e.preventDefault();
      const newUser = prompt("Enter the name of the user");
      if(inputUsers.includes(newUser)){
        alert("User already exists");
        return;
      }
      if(newUser){
        setInputUser([...inputUsers, newUser]);
      }
    }
    
    const handleChange = (e) => {
      if (e.target.type === "checkbox") {
        const updatedUsers = formData.users.includes(e.target.name) ? formData.users.filter((user) => user !== e.target.name) : [...formData.users, e.target.name]; 
        setFormData((prev) => ({
          ...prev,
          users: updatedUsers,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      }
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.name || !formData.amount || !formData.type || formData.users.length === 0) {
        alert("Please fill all the required fields.");
        return;
      }
      if ((formData.type === "percentage" || formData.type === "unequally") && !formData.value) {
        alert("Please provide values for the selected type.");
        return;
      }
      
      axios
        .post("http://localhost:3000/add", formData)
        .then((response) => {
          console.log("Expense added successfully:", response.data.expense);
          handleShowExpenses();
        })
        .catch((error) => {
          console.error("Error adding expense:", error.response?.data || error.message);
        });
      setFormData({
        name: "",
        amount: "",
        type: "",
        users: [],
        value: "",
      });
    };
    
    const handleShowExpenses = () => {
      axios.get("http://localhost:3000/get")
      .then((response) => {
        setAllExpenses(response.data.expenses);
        localStorage.setItem("expenses", JSON.stringify(response.data.expenses));
      });
    }

    useEffect(()=>{
      localStorage.getItem("expenses") && setAllExpenses(JSON.parse(localStorage.getItem("expenses")));
    },[allExpenses]);

    return (
        <ExpenseContext.Provider value={{ formData, handleShowExpenses, handleChange, handleSubmit, allExpenses, addUser, inputUsers }}>
            {children}
        </ExpenseContext.Provider>
    );
}
export default ExpenseContext;
export { ExpenseProvider };
