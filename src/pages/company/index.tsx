"use client"

import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import GreenFinanceProjectForm from "./Form";
// import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/utils/supa";

// Initialize Supabase client
// const supabase = createClient('https://your-supabase-url.supabase.co', 'your-supabase-public-anon-key');

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export default function Company() {
  const [data1, setData] = useState(null);
  const [activeSection, setActiveSection] = useState('Home');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // State for selected project

  useEffect(() => {
    const data = localStorage.getItem('companyData');
    if (data) {
      setData(JSON.parse(data));
    }
    console.log(data);
  }, []);

  useEffect(() => {
    if (data1) {
      // Fetch projects based on company ID
      const fetchProjects = async () => {
        const { data, error } = await supabase
          .from('green_finance_projects') // Replace with your table name
          .select('*')
          .eq('id', data1.id); // Assuming `company_id` is the field linking to the company ID

        if (error) {
          console.error("Error fetching projects:", error);
        } else {
          setProjects(data);
        }
      };
      fetchProjects();
    }
  }, [data1]);

  return (
    <div className={`${poppins.className} h-[100vh] w-[100vw] bg-black flex flex-row`}>
      <div className="w-[25%] flex justify-center items-center flex-col gap-5">
        {data1 && (
          <div className="text-xl font-semibold">
            Hi {data1.company_name}!
          </div>
        )}
        <ul className="space-y-6">
          <li
            className={`cursor-pointer hover:text-gray-400 transition ${activeSection === 'Home' ? 'text-[gray]' : 'text-white'}`}
            onClick={() => setActiveSection('Home')}
          >
            Home
          </li>
          <li
            className={`cursor-pointer hover:text-gray-400 transition ${activeSection === 'Insights' ? 'text-[gray]' : 'text-white'}`}
            onClick={() => setActiveSection('Insights')}
          >
            Insights
          </li>
          <li
            className={`cursor-pointer hover:text-gray-400 transition ${activeSection === 'Projects' ? 'text-[gray]' : 'text-white'}`}
            onClick={() => setActiveSection('Projects')}
          >
            Projects
          </li>
        </ul>
      </div>

      <div className="w-[75%] bg-white rounded-[30px] flex justify-center items-center text-black shadow-lg p-5">
        {activeSection === 'Home' ? (
          <div>
            {data1 ? (
              <div className="w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-blue-600 mb-5 text-center">Company Information</h2>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <div><strong className="text-gray-800">Company Name:</strong> <span className="text-black">{data1.company_name}</span></div>
                  <div><strong className="text-gray-800">Password:</strong> <span className="text-black">{data1.password}</span></div>
                  <div><strong className="text-gray-800">Carbon Emissions:</strong> <span className="text-black">{data1.carbon_emissions}</span></div>
                  <div><strong className="text-gray-800">Renewable Energy:</strong> <span className="text-black">{data1.renewable_energy}</span></div>
                  <div><strong className="text-gray-800">Employee Diversity:</strong> <span className="text-black">{data1.employee_diversity}</span></div>
                  <div><strong className="text-gray-800">Community Investment:</strong> <span className="text-black">{data1.community_investment}</span></div>
                  <div><strong className="text-gray-800">Board Diversity:</strong> <span className="text-black">{data1.board_diversity}</span></div>
                  <div><strong className="text-gray-800">ESG Policy:</strong> <span className="text-black">{data1.esg_policy}</span></div>
                  <div><strong className="text-gray-800">Industry:</strong> <span className="text-black">{data1.industry}</span></div>
                  <div><strong className="text-gray-800">Created At:</strong> <span className="text-black">{new Date(data1.created_at).toLocaleString()}</span></div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Loading company data...</p>
            )}
          </div>
        ) : activeSection === 'Insights' ? (
          <div>Here are your Insights.</div>
        ) : activeSection === 'Projects' ? (
          <div className="overflow-y-auto h-[80vh]">
            <h3 className="text-2xl font-semibold text-center mb-5">Projects</h3>
            {projects && Array.isArray(projects) && projects.length > 0 ? (
  <div className="overflow-x-auto w-full">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="border p-3 text-left">No</th>
          <th className="border p-3 text-left">Project Name</th>
          <th className="border p-3 text-left">Project Description</th>
          <th className="border p-3 text-left">Start Date</th>
          <th className="border p-3 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={project.id}>
            <td className="border p-3">{index + 1}</td>
            <td className="border p-3">{project.project_name}</td>
            <td className="border p-3">
              {project.description && project.description.length > 45
                ? project.description.substring(0, 45) + '...'
                : project.description}
            </td>
            <td className="border p-3">{new Date(project.start_date).toLocaleDateString()}</td>
            <td className="border p-3">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setSelectedProject(project)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p className="text-gray-400">No projects found.</p>
)}



          </div>
        ) : (
          <div>Select a section.</div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[80%] md:w-[50%] lg:w-[30%]">
            <h2 className="text-3xl font-semibold mb-4">{selectedProject.project_name}</h2>
            <p className="mb-4">{selectedProject.description}</p>
            <div className="space-y-2">
              <p><strong>Location:</strong> {selectedProject.location}</p>
              <p><strong>Investment Amount:</strong> {selectedProject.investment_amount}</p>
              <p><strong>Status:</strong> {selectedProject.status}</p>
              <p><strong>Start Date:</strong> {new Date(selectedProject.start_date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(selectedProject.end_date).toLocaleDateString()}</p>
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setSelectedProject(null)} // Close the modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
