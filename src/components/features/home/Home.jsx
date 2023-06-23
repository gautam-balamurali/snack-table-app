/* eslint-disable */

import { useSnacks } from "../../../core/contexts/SnacksContext";

import "./Home.css";

const Home = () => {
  const {
    snacksDataDisplayed,
    searchInput,
    handleSearchInputChange,
    handleSort,
  } = useSnacks();

  return (
    <div className="snacks-table-container">
      <h2 className="table-heading">Snack Table</h2>
      <input
        className="search-bar"
        type="text"
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Search by product name or ingredients"
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("product_name")}>Product Name</th>
            <th onClick={() => handleSort("product_weight")}>Product Weight</th>
            <th onClick={() => handleSort("price")}>Price</th>
            <th onClick={() => handleSort("calories")}>Calories</th>
            <th onClick={() => handleSort("ingredients")}>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {snacksDataDisplayed.map((snack) => (
            <tr key={snack.id}>
              <td>{snack.id}</td>
              <td>{snack.product_name}</td>
              <td>{snack.product_weight}</td>
              <td>{snack.price}</td>
              <td>{snack.calories}</td>
              <td>{snack.ingredients.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
