import React from "react";

export default function DynamicForm({ data, theme = {}, logo }) {
  return (
    <div className={`p-4 max-w-4xl mx-auto`} style={{ fontFamily: theme.font || 'sans-serif' }}>
      <div className="flex justify-between items-center mb-6">
        {logo && <img src={logo} alt="Logo" className="h-12" />}
        <h1 className="text-2xl font-bold" style={{ color: theme.primaryColor || '#333' }}>
          Dynamic Form
        </h1>
      </div>

      <div className="grid gap-6">
        {data.map((item, idx) => {
          switch (item.ui_type) {
            case "Text":
              return (
                <div key={idx}>
                  <label className="block font-semibold">{item.label}</label>
                  <input
                    type="text"
                    defaultValue={item.value}
                    className="w-full border rounded p-2"
                  />
                </div>
              );

            case "TextArea":
              return (
                <div key={idx}>
                  <label className="block font-semibold">{item.label}</label>
                  <textarea
                    defaultValue={item.value}
                    className="w-full border rounded p-2"
                  />
                </div>
              );

            case "Image":
              return (
                <div key={idx}>
                  <label className="block font-semibold">{item.label}</label>
                  <img src={item.value} alt={item.label} className="w-40 h-auto rounded" />
                </div>
              );

            case "Browse":
              return (
                <div key={idx}>
                  <label className="block font-semibold">{item.label}</label>
                  <input type="file" className="w-full border rounded p-2" />
                </div>
              );

            case "Video":
              return (
                <div key={idx}>
                  <label className="block font-semibold">{item.label}</label>
                  <video src={item.value} controls className="w-full rounded" />
                </div>
              );

            case "Cards":
              return (
                <div key={idx}>
                  <label className="block font-semibold">{item.label}</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.value.map((val, i) => (
                      <div key={i} className="px-4 py-2 bg-blue-100 rounded shadow text-sm">
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              );

            case "Table":
              return (
                <div key={idx}>
                  <label className="block font-semibold">{item.label}</label>
                  <table className="w-full mt-2 border">
                    <thead>
                      <tr>
                        {Object.keys(item.value[0] || {}).map((key) => (
                          <th key={key} className="border px-4 py-2 text-left bg-gray-200">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.value.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((val, j) => (
                            <td key={j} className="border px-4 py-2">{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            default:
              return <div key={idx}>Unsupported type: {item.ui_type}</div>;
          }
        })}
      </div>
    </div>
  );
}
