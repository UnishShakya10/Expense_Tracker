import { useState } from "react";

const AddExpense = ({
  onClose,
  onAdd,
  onUpdate,
  editExpense,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [expense, setExpense] = useState({
    title: editExpense?.title || "",
    amount: editExpense?.amount || "",
    category: editExpense?.category || "",
    date: editExpense?.date
      ? editExpense.date.split("T")[0]
      : "",
    type: editExpense?.type || "expense",
  });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SUBMIT FORM
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (
      !expense.title ||
      !expense.amount ||
      !expense.category ||
      !expense.date
    ) {
      alert("Please fill all fields");
      return;
    }

    const finalExpense = {
      ...expense,
      amount: Number(expense.amount),
    };

    setIsSaving(true);
    setSaveError("");

    try {
      if (editExpense) {
        await onUpdate(finalExpense);
      } else {
        await onAdd(finalExpense);
      }
    } catch (error) {
      setSaveError(
        error.response?.data?.message ||
          "Could not save the expense. Make sure the backend is running and try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl p-8 shadow-2xl">

        {/* =========================
            HEADER
        ========================= */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            {editExpense
              ? "Edit Expense"
              : "Add Expense"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 text-2xl hover:text-black"
          >
            ×
          </button>

        </div>

        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* TITLE */}

          <div>

            <label className="block font-medium mb-2">
              Expense Name
            </label>

            <input
              type="text"
              name="title"
              value={expense.title}
              onChange={handleChange}
              placeholder="e.g. Groceries"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
            />

          </div>

          {/* AMOUNT */}

          <div>

            <label className="block font-medium mb-2">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
            />

          </div>

          {/* CATEGORY */}

          <div>

            <label className="block font-medium mb-2">
              Category
            </label>

            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
            >

              <option value="">
                Select Category
              </option>

              <option value="Food">
                Food
              </option>

              <option value="Transport">
                Transport
              </option>

              <option value="Shopping">
                Shopping
              </option>

              <option value="Bills">
                Bills
              </option>

              <option value="Entertainment">
                Entertainment
              </option>

            </select>

          </div>

          {/* DATE */}

          <div>

            <label className="block font-medium mb-2">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
            />

          </div>

          {/* BUTTONS */}

          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 rounded-xl py-3 font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-[#08081c] text-white rounded-xl py-3 font-semibold hover:bg-black"
            >
              {isSaving
                ? "Saving..."
                : editExpense
                  ? "Update Expense"
                  : "Add Expense"}
            </button>

          </div>

          {saveError && (
            <p role="alert" className="text-sm text-red-600">
              {saveError}
            </p>
          )}

        </form>

      </div>

    </div>
  );
};

export default AddExpense;
