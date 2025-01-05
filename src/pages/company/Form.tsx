import React, { useState } from "react";
import { supabase } from "@/utils/supa"; // Make sure to adjust the import path as needed

const GreenFinanceProjectForm = ({ id }) => {
  console.log(id);
  const [formData, setFormData] = useState({
    id: id || "", // Set id if passed as prop or keep it empty
    project_name: "",
    project_description: "",
    project_start_date: "",
    project_end_date: "",
    project_location: "",
    total_budget: "",
    capital_required: "",
    expected_roi: "",
    funding_source: "",
    carbon_reduction: "",
    energy_efficiency: "",
    water_usage_reduction: "",
    job_creation: "",
    community_engagement: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert the form data into Supabase
      const { data, error } = await supabase
        .from("green_finance_projects") // Make sure your table is correctly named
        .upsert(formData, { onConflict: ["id"] }); // Use upsert to update or insert data based on id

      if (error) throw error;

      console.log("Form submitted successfully:", data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Green Finance Project Form
      </h2>

      {/* Basic Project Information */}
      <div>
        <label className="block text-gray-700">Project Name:</label>
        <input
          type="text"
          name="project_name"
          value={formData.project_name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Project Description:</label>
        <textarea
          name="project_description"
          value={formData.project_description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Project Start Date:</label>
        <input
          type="date"
          name="project_start_date"
          value={formData.project_start_date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Project End Date:</label>
        <input
          type="date"
          name="project_end_date"
          value={formData.project_end_date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Project Location:</label>
        <input
          type="text"
          name="project_location"
          value={formData.project_location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      {/* Financial Information */}
      <div>
        <label className="block text-gray-700">Total Project Budget:</label>
        <input
          type="number"
          name="total_budget"
          value={formData.total_budget}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Capital Required:</label>
        <input
          type="number"
          name="capital_required"
          value={formData.capital_required}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Expected ROI (%):</label>
        <input
          type="number"
          name="expected_roi"
          value={formData.expected_roi}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Funding Source:</label>
        <input
          type="text"
          name="funding_source"
          value={formData.funding_source}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Environmental Impact */}
      <div>
        <label className="block text-gray-700">Carbon Emissions Reduction (tons):</label>
        <input
          type="number"
          name="carbon_reduction"
          value={formData.carbon_reduction}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-gray-700">Energy Efficiency Improvement (%):</label>
        <input
          type="number"
          name="energy_efficiency"
          value={formData.energy_efficiency}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-gray-700">Water Usage Reduction (%):</label>
        <input
          type="number"
          name="water_usage_reduction"
          value={formData.water_usage_reduction}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Social Impact */}
      <div>
        <label className="block text-gray-700">Job Creation (Number of Jobs):</label>
        <input
          type="number"
          name="job_creation"
          value={formData.job_creation}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-gray-700">Community Engagement (Details):</label>
        <textarea
          name="community_engagement"
          value={formData.community_engagement}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Submit Project
        </button>
      </div>
    </form>
  );
};

export default GreenFinanceProjectForm;
