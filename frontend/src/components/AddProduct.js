import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: null, // Now we'll store the file here
    price: "",
    stockQuantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: e.target.files[0] }); // Handle file input change
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("vendorToken");

    // Create a FormData object to send the data including the image
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("category", formData.category);
    form.append("price", formData.price);
    form.append("stockQuantity", formData.stockQuantity);
    form.append("image", formData.image); // Append the file

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // This tells the server we're sending a file
          },
        }
      );
      alert("Product added successfully!");
      onProductAdded(response.data.product); // Update the product list
      onClose(); // Close the modal after adding the product
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md relative">
      {/* Close Button (X) */}
      <button
        type="button"
        className="absolute top-2 right-2 text-gray-600 text-2xl"
        onClick={onClose}
      >
        &times;
      </button>
      
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={formData.description}
        onChange={handleChange}
        className="mb-4 p-2 border rounded w-full"
      />
      {/* Category Dropdown */}
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="mb-4 p-2 border rounded w-full"
        required
      >
        <option value="">Select Category</option>
        <option value="Fashion">Fashion</option>
        <option value="Health & Wellness">Health & Wellness</option>
        <option value="Home Appliances">Home Appliances</option>
        <option value="Toys & Games">Toys & Games</option>
        <option value="Furniture">Furniture</option>
        <option value="Automotive">Automotive</option>
        <option value="Books & Stationery">Books & Stationery</option>
        <option value="Gourmet & Food">Gourmet & Food</option>
        <option value="Tech & Gadgets">Tech & Gadgets</option>
        <option value="Accessories">Accessories</option>
            </select>
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="mb-4 p-2 border rounded w-full"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <input
        type="number"
        name="stockQuantity"
        placeholder="Stock Quantity"
        value={formData.stockQuantity}
        onChange={handleChange}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[#008080] text-white rounded shadow-md hover:bg-[#006666]"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
