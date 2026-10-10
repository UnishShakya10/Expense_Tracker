
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Clock,
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";

import Cards from "../components/Cards";
import AddExpense from "../components/AddExpense";
import Categories from "../components/Categories";
import Dates from "../components/Dates";

const Home = () => {
  // =========================
  // STATES
  // =========================

  const [showExpense, setShowExpense] = useState(false);

  const [editExpense, setEditExpense] = useState(null);

  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [selectedDate, setSelectedDate] =
    useState("All Dates");

  const [searchTerm, setSearchTerm] = useState("");

  const [expenses, setExpenses] = useState([]);

  // =========================
  // GET EXPENSES
  // =========================

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log("Error fetching expenses:", error);
      });
  }, []);

  // =========================
  // ADD EXPENSE
  // =========================

  const addExpense = async (newExpense) => {
    const response = await axios.post(
      "http://localhost:5000/api/expenses",
      newExpense
    );

    setExpenses((prev) => [
      response.data,
      ...prev,
    ]);

    setShowExpense(false);
  };

  // =========================
  // UPDATE EXPENSE
  // =========================

  const updateExpense = async (updatedExpense) => {
    const response = await axios.put(
      `http://localhost:5000/api/expenses/${editExpense._id}`,
      updatedExpense
    );

    setExpenses((prev) =>
      prev.map((expense) =>
        expense._id === editExpense._id
          ? response.data
          : expense
      )
    );

    setEditExpense(null);
    setShowExpense(false);
  };

  // =========================
  // DELETE EXPENSE
  // =========================

  const deleteExpense = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/expenses/${id}`
      );

      setExpenses((prev) =>
        prev.filter((expense) => expense._id !== id)
      );
    } catch (error) {
      console.log("Error deleting expense:", error);
    }
  };

  // =========================
  // TOTAL EXPENSE
  // =========================

  const totalExpense = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount || 0),
    0
  );

  // =========================
  // THIS MONTH EXPENSE
  // =========================

  const currentDate = new Date();

  const thisMonthExpense = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);

      return (
        expenseDate.getMonth() ===
          currentDate.getMonth() &&
        expenseDate.getFullYear() ===
          currentDate.getFullYear()
      );
    })
    .reduce(
      (total, expense) =>
        total + Number(expense.amount || 0),
      0
    );

  // =========================
  // TOTAL TRANSACTIONS
  // =========================

  const totalTransactions = expenses.length;

  // =========================
  // TOTAL CATEGORIES
  // =========================

  const categoryCount = [
    ...new Set(
      expenses.map((expense) => expense.category)
    ),
  ].length;

  // =========================
  // FILTER EXPENSES
  // =========================

  const filteredExpenses = expenses.filter(
    (expense) => {
      // CATEGORY FILTER
      const categoryMatch =
        selectedCategory === "All Categories" ||
        expense.category === selectedCategory;

      // SEARCH FILTER
      const searchMatch =
        expense.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      // DATE FILTER
      let dateMatch = true;

      const expenseDate = new Date(expense.date);

      const today = new Date();

      // Remove time
      today.setHours(0, 0, 0, 0);
      expenseDate.setHours(0, 0, 0, 0);

      if (selectedDate === "Today") {
        dateMatch =
          expenseDate.getTime() ===
          today.getTime();
      }

      if (selectedDate === "Yesterday") {
        const yesterday = new Date(today);
        yesterday.setDate(
          yesterday.getDate() - 1
        );

        dateMatch =
          expenseDate.getTime() ===
          yesterday.getTime();
      }

      if (selectedDate === "This Week") {
        const startOfWeek = new Date(today);

        const day = today.getDay();

        startOfWeek.setDate(
          today.getDate() - day
        );

        startOfWeek.setHours(0, 0, 0, 0);

        dateMatch =
          expenseDate >= startOfWeek &&
          expenseDate <= today;
      }

      if (selectedDate === "This Month") {
        dateMatch =
          expenseDate.getMonth() ===
            today.getMonth() &&
          expenseDate.getFullYear() ===
            today.getFullYear();
      }

      return (
        categoryMatch &&
        searchMatch &&
        dateMatch
      );
    }
  );

  // =========================
  // OPEN EDIT
  // =========================

  const handleEdit = (expense) => {
    setEditExpense(expense);
    setShowExpense(true);
  };

  // =========================
  // CLOSE MODAL
  // =========================

  const closeModal = () => {
    setShowExpense(false);
    setEditExpense(null);
  };

  // =========================
  // JSX
  // =========================

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Expense Tracker
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back, Unish Shakya
          </p>
        </div>

        <button
          onClick={() => {
            setEditExpense(null);
            setShowExpense(true);
          }}
          className="flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          <Plus size={20} />

          Add Expense
        </button>

      </div>

      {/* =========================
          CARDS
      ========================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <Cards
          title="Total Expense"
          amount={`Rs. ${totalExpense.toLocaleString()}`}
          icon={<Wallet size={22} />}
        />

        <Cards
          title="This Month"
          amount={`Rs. ${thisMonthExpense.toLocaleString()}`}
          icon={<Clock size={22} />}
        />

        <Cards
          title="Transactions"
          amount={totalTransactions}
          icon={<TrendingDown size={22} />}
        />

        <Cards
          title="Categories"
          amount={categoryCount}
          icon={<TrendingUp size={22} />}
        />

      </div>

      {/* =========================
          FILTER SECTION
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm p-5 mb-8">

        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-black"
            />

          </div>

          {/* CATEGORY */}

          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* DATE */}

          <Dates
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

        </div>

      </div>

      {/* =========================
          EXPENSE TABLE
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-gray-100">

          <h2 className="text-xl font-bold text-gray-900">
            Expense History
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Your recent transactions
          </p>

        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Title
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Amount
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredExpenses.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No expenses found
                  </td>

                </tr>

              ) : (

                filteredExpenses.map((expense) => (

                  <tr
                    key={expense._id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >

                    {/* TITLE */}

                    <td className="px-6 py-4">

                      <p className="font-medium text-gray-900">
                        {expense.title}
                      </p>

                    </td>

                    {/* CATEGORY */}

                    <td className="px-6 py-4">

                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {expense.category}
                      </span>

                    </td>

                    {/* DATE */}

                    <td className="px-6 py-4 text-gray-600">

                      {new Date(
                        expense.date
                      ).toLocaleDateString()}

                    </td>

                    {/* AMOUNT */}

                    <td className="px-6 py-4 font-semibold text-red-500">

                      Rs.{" "}
                      {Number(
                        expense.amount
                      ).toLocaleString()}

                    </td>

                    {/* ACTION */}

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            handleEdit(expense)
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            deleteExpense(
                              expense._id
                            )
                          }
                          className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* MOBILE CARDS */}

        <div className="md:hidden">

          {filteredExpenses.length === 0 ? (

            <div className="text-center py-10 text-gray-500">
              No expenses found
            </div>

          ) : (

            filteredExpenses.map((expense) => (

              <div
                key={expense._id}
                className="p-5 border-t border-gray-100"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="font-semibold text-gray-900">
                      {expense.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {expense.category}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(
                        expense.date
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <p className="font-bold text-red-500">
                    Rs.{" "}
                    {Number(
                      expense.amount
                    ).toLocaleString()}
                  </p>

                </div>

                <div className="flex justify-end gap-2 mt-4">

                  <button
                    onClick={() =>
                      handleEdit(expense)
                    }
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-700"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteExpense(
                        expense._id
                      )
                    }
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-500"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* =========================
          ADD / EDIT EXPENSE MODAL
      ========================= */}

      {showExpense && (

        <AddExpense
          onClose={closeModal}
          onAdd={addExpense}
          onUpdate={updateExpense}
          editExpense={editExpense}
        />

      )}

    </div>
  );
};

export default Home;
