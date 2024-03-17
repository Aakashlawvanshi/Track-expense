import React, { useRef, useState } from "react";
import Select from "./Select.jsx";
import Input from "./Input.jsx";

const ExpenseForm = ({ expense, setExpense, setExpenses, editingRowId,  setEditingRowId }) => {
  // const [title ,setTitle] = useState('')
  // const [category , setCategory] = useState('')
  // const [amount , setAmount] = useState('')

  //   const titleRef = useRef()
  //   const categoryRef = useRef()
  //   const amountRef = useRef()
  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [{ required: true, message: "Please Enter Title" }],
    category: [{ required: true, message: "Please Select Category" }],
    amount: [{ required: true, message: "Please Enter Amount", },
           {
            pattern :/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
            message: 'Please enter valid number'
           }
  ],
  };

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].forEach((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true
        }
        if(rule.pattern && !rule.pattern.test(value)){
          errorsData[key] = rule.message;
          return true
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expense);

    if (Object.keys(validateResult).length) return;

    if (editingRowId) {
      setExpenses((prevState) => 
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;

        })
      )
      setExpense({
        title: "",
        category: "",
        amount: "",
      })
      setEditingRowId('')
      return
    }
    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);

    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));

    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        value={expense.title}
        name="title"
        onChange={handleChange}
        error={errors.title}
      />

      <Select
        label="Category"
        id="category"
        value={expense.category}
        name="category"
        options={[
          "Education",
          "Bills",
          "Medicine",
          "Clothes",
          "Electronics",
          "Grocery",
        ]}
        defaultOption="Select Category"
        onChange={handleChange}
        error={errors.category}
      />

      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
};

export default ExpenseForm;
