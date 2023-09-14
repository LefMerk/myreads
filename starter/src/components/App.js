import "../css/App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import BookList from "./BookList";
import Search from "./Search";

export default function App() {

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<BookList />} />
        <Route exact path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}