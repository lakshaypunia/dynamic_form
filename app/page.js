"use client";
import { useState, useEffect } from "react";
import DynamicForm from "@/component/dynamicform";

export default function Home({ initialFields }) {
  const [fields, setFields] = useState(initialFields || []);
  const [loading, setLoading] = useState(false);

  const fetchNewForm = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/form", {
  method: "GET",
});
      console.log(res)
      const data = await res.json();
      console.log(data)
      setFields(data);
    } catch (err) {
      console.error("Failed to fetch new form:", err);
    } finally {
      setLoading(false);
    }
  };

  const theme = {
    primaryColor: "#1e3a8a",
    font: "Arial"
  };

  return (
    <>
      <div className="bg-white h-dvh w-full min-h-screen p-4 ">
        <div className="flex flex-col items-center justify-center space-y-8 mb-6 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-800">Dynamic Form</h1>
          <div className="flex flex-col items-center space-y-2">
          <button
            onClick={fetchNewForm}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Loading..." : "Fetch New Form"}
          </button>
          <p className="text-gray-600 text-xl bold ">Click this button to get a random form from the database</p>
          </div>
        </div>

        <DynamicForm data={fields} theme={theme} logo="/logo.png" />
      
      </div>
    </>
    
  );
}

// SSR load first form


