import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

import { snacks } from "../db/snacksData";

export const SnacksContext = createContext();

export const SnacksProvider = ({ children }) => {
  const [snacksData, setSnacksData] = useState({
    snacksDataDetails: [],
    snacksDataDisplayed: [],
    searchInput: "",
    sortColumn: "",
    sortOrder: "",
  });

  useEffect(() => {
    setSnacksData((prev) => ({
      ...prev,
      snacksDataDetails: snacks,
      snacksDataDisplayed: snacks,
    }));
  }, []);

  const handleSearchInputChange = (event) => {
    setSnacksData((prev) => ({ ...prev, searchInput: event.target.value }));
  };

  const handleSort = (column) => {
    if (snacksData.sortColumn === column) {
      setSnacksData((prev) => ({
        ...prev,
        sortOrder: snacksData.sortOrder === "asc" ? "desc" : "asc",
      }));
    } else {
      setSnacksData((prev) => ({
        ...prev,
        sortOrder: "asc",
        sortColumn: column,
      }));
    }
  };

  useEffect(() => {
    if (
      snacksData.snacksDataDetails &&
      (snacksData.searchInput || snacksData.sortColumn)
    ) {
      let filteredData = snacksData.snacksDataDetails;

      if (snacksData.searchInput) {
        filteredData = filteredData.filter((snack) => {
          const searchTerm = snacksData.searchInput.toLowerCase();
          const productName = snack.product_name.toLowerCase();
          const ingredients = snack.ingredients.map((ingredient) =>
            ingredient.toLowerCase()
          );
          return (
            productName.includes(searchTerm) ||
            ingredients.some((ingredient) => ingredient.includes(searchTerm))
          );
        });
      }

      if (snacksData.sortColumn) {
        filteredData = filteredData.sort((a, b) => {
          const aValue = a[snacksData.sortColumn];
          const bValue = b[snacksData.sortColumn];

          if (snacksData.sortColumn === "ingredients") {
            const sortedA = aValue.join(", ").toLowerCase();
            const sortedB = bValue.join(", ").toLowerCase();
            return snacksData.sortOrder === "asc"
              ? sortedA.localeCompare(sortedB)
              : sortedB.localeCompare(sortedA);
          } else if (
            snacksData.sortColumn === "price" ||
            snacksData.sortColumn === "calories"
          ) {
            return snacksData.sortOrder === "asc"
              ? aValue - bValue
              : bValue - aValue;
          } else if (snacksData.sortColumn === "product_weight") {
            const weightA = parseInt(aValue);
            const weightB = parseInt(bValue);
            return snacksData.sortOrder === "asc"
              ? weightA - weightB
              : weightB - weightA;
          } else {
            if (typeof aValue === "string" && typeof bValue === "string") {
              return snacksData.sortOrder === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
            } else {
              return snacksData.sortOrder === "asc"
                ? aValue - bValue
                : bValue - aValue;
            }
          }
        });
      }

      setSnacksData((prev) => ({
        ...prev,
        snacksDataDisplayed: filteredData,
      }));
    } else if (!snacksData.searchInput && !snacksData.sortColumn) {
      setSnacksData((prev) => ({
        ...prev,
        snacksDataDisplayed: snacksData.snacksDataDetails,
      }));
    }
  }, [
    snacksData.searchInput,
    snacksData.sortColumn,
    snacksData.sortOrder,
    snacksData.snacksDataDetails,
  ]);

  return (
    <SnacksContext.Provider
      value={{ ...snacksData, handleSearchInputChange, handleSort }}
    >
      {children}
    </SnacksContext.Provider>
  );
};

export const useSnacks = () => useContext(SnacksContext);
