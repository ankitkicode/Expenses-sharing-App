import { useContext, } from "react";
import ExpenseContext from "../context/ExpenseContext";
import Tooltip from '@mui/material/Tooltip';


const App = () => {
  const { formData, handleChange, handleSubmit, allExpenses, addUser, inputUsers } = useContext(ExpenseContext);
  return (
    <div className="h-screen w-full flex max-[750px]:flex-col gap-5 items-center justify-center bg-zinc-600">
      <div className="h-[90vh] w-[80vh] bg-zinc-700 px-8 overflow-y-auto ">
        <form className="flex flex-col items-center justify-center h-auto w-full gap-4 mt-12">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="py-3 px-3 text-lg bg-slate-600 text-white outline-none rounded-sm w-full"
            placeholder="Enter your name"
          />
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter the amount"
            className="py-3 px-3 text-lg bg-slate-600 text-white outline-none rounded-sm w-full"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="py-3 px-3 text-lg bg-slate-600 text-white outline-none rounded-sm w-full"
          >
            <option value="">Select a type</option>
            <option value="equally">Equally</option>
            <option value="unequally">Unequally</option>
            <option value="percentage">Percentage</option>
          </select>


          <datalist id="browsers">
            <option value="Edge" />
            <option value="Firefox" />
            <option value="Chrome" />
            <option value="Opera" />
            <option value="Safari" />
          </datalist>


          <div className="flex-col gap-6 pt-2 text-lg text-white w-full">

            <div className="w-[100%] flex items-center justify-between  py-3">
              <p className="text-lg capitalize">- Check to add user</p>
              <button
                title="Add user"
                onClick={addUser}
                className=" bg-slate-600
            text-white
            text-lg
              px-3
              py-1
              rounded-sm
              outline-none">
                Add user
              </button>

            </div>

            {inputUsers.map((user, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name={user}
                  id={`addUser-${user}`}
                  checked={formData.users.includes(user)}
                  onChange={handleChange}
                />
                <label htmlFor={`addUser-${user}`}> {user.toLocaleUpperCase()}</label>
              </div>
            ))}
          </div>

          {(formData.type === "percentage" || formData.type === "unequally") && (
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="py-3 px-3 text-lg bg-slate-600 text-white outline-none rounded-sm w-full"
              placeholder="Enter the value (comma-separated)"
            />
          )}

          <Tooltip title="Add expense">
            <button
              onClick={handleSubmit}
              className="py-3 px-3 mt-5 text-lg bg-slate-600 text-white outline-none rounded-sm w-full"
            >
              Add
            </button>
          </Tooltip>

        </form>

      </div>
      <div className="h-[90vh] w-[80vh] bg-zinc-700 px-8 overflow-y-auto ">
        <h2 className="text-2xl font-bold text-slate-200 mb-2">Expenses</h2>
        <div className="flex flex-col ">
          {
            allExpenses ? allExpenses.reverse().map((expense, index) => (
              <div key={index} className="bg-slate-600 p-4 rounded-sm mb-4 border-b-2">
                <h3 className="text-lg font-bold text-slate-200">
                  {expense.loginUser} - {expense.amount}
                </h3>
                <p className="text-slate-300">
                  {expense.type} - {expense.users.map((user) => `${user.name} - (${user.balance})`).join(", ")}
                </p>
              </div>
            )) : <p className="text-lg text-slate-200">No expenses added yet.</p>
          }



        </div>
      </div>
    </div>
  );
};

export default App;
