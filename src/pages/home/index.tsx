import React, { useState } from "react";
import { Poppins } from "next/font/google";
import { supabase } from "@/utils/supa";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export default function Home() {
  const [isLogin, setIsLogin] = useState(false); // Track login vs signup form
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [carbonEmissions, setCarbonEmissions] = useState('');
  const [renewableEnergy, setRenewableEnergy] = useState('');
  const [employeeDiversity, setEmployeeDiversity] = useState('');
  const [communityInvestment, setCommunityInvestment] = useState('');
  const [boardDiversity, setBoardDiversity] = useState('');
  const [esgPolicy, setEsgPolicy] = useState(""); // For file input
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [industry, setIndustry] = useState('');

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
  };

  // Handle form submission for sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Insert data into Supabase table 'companies' (add additional fields)
      const { data, error } = await supabase
        .from('companies') // Assuming you have a table named 'companies' in Supabase
        .insert([{
          company_name: companyName,
          password: password,
          carbon_emissions: carbonEmissions,
          renewable_energy: renewableEnergy,
          employee_diversity: employeeDiversity,
          community_investment: communityInvestment,
          board_diversity: boardDiversity,
          esg_policy: esgPolicy,
          industry: industry       
          
          // Handle file upload separately if needed
        }]);
      if (error) throw error;
      setSuccess('Company registered successfully!');
      setCompanyName('');
      setPassword('');
      setCarbonEmissions('');
      setRenewableEnergy('');
      setEmployeeDiversity('');
      setCommunityInvestment('');
      setBoardDiversity('');
      setEsgPolicy(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('company_name', companyName)
        .eq('password', password)
        .single();
  
      if (error || !data) {
        throw new Error('Invalid company name or password');
      }
      
      // Store the entire login data as JSON in localStorage
      localStorage.setItem('companyData', JSON.stringify(data));
  
      // Set success message
      setSuccess('Login successful!');
      
      // Clear form fields
      setCompanyName('');
      setPassword('');
      
      // Redirect to /company page
      window.location.href = '/company';
    } catch (error) {
      setError(error.message);
    }
  };
  
  

  return (
    <div className={`${poppins.className} h-[100vh] w-[100vw] bg-black flex flex-row`}>
      <div className="w-[25%] flex justify-center items-center flex-col gap-5">
        <img src="https://www.temenos.com/wp-content/themes/temenos/dist/svg/temenos-logo.svg" className="w-[50%]" />
        <img src="https://industriai.shaastra.org/assets/shaastra2025-xgaFcPCP.png" className="w-[50%]" />
        <img src="https://industriai.shaastra.org/assets/logo-ZCulCl1y.png" className="w-[50%] mt-[-1rem]" />
      </div>
      <div className="w-[75%] bg-white rounded-[30px] flex justify-center items-center shadow-lg">
        <div className="bg-white w-[60%] max-h-[500px] rounded-2xl flex flex-col justify-center items-center text-black border border-gray-300 shadow-md p-5 gap-5 overflow-y-scroll">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {isLogin ? (
            // Login Form
            <>
              <h1 className="text-xl font-semibold text-center">Login</h1>
              <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Company Name:</label>
                  <input
                    type="text"
                    className="p-2 border rounded-md"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Password:</label>
                  <input
                    type="password"
                    className="p-2 border rounded-md"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4">
                  Login
                </button>
              </form>
              <p className="mt-2 text-sm text-center">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            // Sign Up Form
            <>
              <h1 className="text-xl font-semibold text-center mt-[750px]">Sign Up</h1>
              <form className="w-full flex flex-col gap-4" onSubmit={handleSignUp}>
                <div className="flex flex-col gap-2 ">
                  <label className="text-sm font-medium">Company Name:</label>
                  <input
                    type="text"
                    className="p-2 border rounded-md"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Industry:</label>
      <select
        className="p-2 border rounded-md"
        value={industry}
        onChange={handleIndustryChange} // Handle the change event
      >
        <option value="">Select Industry</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Technology">Technology</option>
        <option value="Finance">Finance</option>
        <option value="Healthcare">Healthcare</option>
      </select>
    </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Password:</label>
                  <input
                    type="password"
                    className="p-2 border rounded-md"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                {/* Environmental Metrics */}
                <h2 className="text-lg font-semibold mt-4">Environmental Metrics</h2>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Carbon Emissions (in Metric Tons):</label>
                  <input
                    type="number"
                    className="p-2 border rounded-md"
                    placeholder="Enter carbon emissions"
                    value={carbonEmissions}
                    onChange={(e) => setCarbonEmissions(Math.max(0, e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Renewable Energy Usage (Percentage):</label>
                  <input
                    type="number"
                    className="p-2 border rounded-md"
                    placeholder="Enter renewable energy usage"
                    value={renewableEnergy}
                    onChange={(e) => setRenewableEnergy(Math.max(0, e.target.value))}
                  />
                </div>

                {/* Social Metrics */}
                <h2 className="text-lg font-semibold mt-4">Social Metrics</h2>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Employee Diversity (Percentage):</label>
                  <input
                    type="number"
                    className="p-2 border rounded-md"
                    placeholder="Enter employee diversity percentage"
                    value={employeeDiversity}
                    onChange={(e) => setEmployeeDiversity(Math.max(0, e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Community Investment (in USD):</label>
                  <input
                    type="number"
                    className="p-2 border rounded-md"
                    placeholder="Enter community investment"
                    value={communityInvestment}
                    onChange={(e) => setCommunityInvestment(Math.max(0, e.target.value))}
                  />
                </div>

                {/* Governance Metrics */}
                <h2 className="text-lg font-semibold mt-4">Governance Metrics</h2>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Board Diversity (Percentage):</label>
                  <input
                    type="number"
                    className="p-2 border rounded-md"
                    placeholder="Enter board diversity percentage"
                    value={boardDiversity}
                    onChange={(e) => setBoardDiversity(Math.max(0, e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">ESG Policy Disclosure:</label>
                    <textarea
                        className="p-2 border rounded-md"
                        placeholder="Enter ESG Policy"
                        value={esgPolicy}
                        onChange={(e) => setEsgPolicy(e.target.value)} // Set the text input value
                        rows="5" // Adjust the rows for a larger text box
                    />
                </div>


                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4">
                  Sign Up
                </button>
              </form>
              <p className="mt-2 text-sm text-center">
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
