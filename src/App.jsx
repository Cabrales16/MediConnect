import React from "react";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold">Contenido de la página</h1>
      </main>
    </div>
  );
}
