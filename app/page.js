"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
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
      <Head>
        <title>Dynamic Form</title>
      </Head>
      <main className="min-h-screen bg-gray-50 p-4">
        <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800">Dynamic Form</h1>
          <button
            onClick={fetchNewForm}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Loading..." : "Fetch New Form"}
          </button>
        </div>

        <DynamicForm data={fields} theme={theme} logo="/logo.png" />
      </main>
    </>
  );
}

// SSR load first form


