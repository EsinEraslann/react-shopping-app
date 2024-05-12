import { Button, Form, Table } from "react-bootstrap";
import "./App.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";

const shops = ["Migros", "Teknosa", "Bim"];
const categories = ["Elektronik", "Şarküteri", "Oyuncak", "Bakliyat", "Fırın"];

const StyledTable = styled.td`
  text-decoration: ${(props) => (props.isBought ? "line-through" : "none")};
`;

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productShop, setProductShop] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const [filteredShop, setFilteredShop] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (alertShown) {
      alert("Shopping Completed!");
    }
  }, [alertShown]);

  const handleToggleBought = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, isBought: !product.isBought }
        : product
    );
    setProducts(updatedProducts);

    if (!alertShown && updatedProducts.every((uP) => Boolean(uP.isBought))) {
      setAlertShown(true);
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: nanoid(),
      name: productName,
      category: productCategory,
      shop: productShop,
    };
    setProducts([...products, newProduct]);
    setProductName("");
    setProductShop("");
    setProductCategory("");
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(filteredName.toLowerCase());
    const shopMatch = product.shop === filteredShop || filteredShop === "";
    const categoryMatch =
      product.category === filteredCategory || filteredCategory === "";
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "bought" && product.isBought) ||
      (filterStatus === "not-bought" && !product.isBought);
    return nameMatch && shopMatch && categoryMatch && statusMatch;
  });

  return (
    <>
      <div className="container d-flex gap-5 justify-content-center">
        <Form>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productShop">
            <Form.Label>Shop</Form.Label>
            <Form.Control
              as="select"
              value={productShop}
              onChange={(e) => setProductShop(e.target.value)}
            >
              <option>Select Shop</option>
              {shops.map((shop, index) => (
                <option key={index} value={shop}>
                  {shop}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option>Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button className="mt-2" variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Form>



        <Form>
          <Form.Group controlId="filteredName">
            <Form.Label>Filter by Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={filteredName}
              onChange={(e) => setFilteredName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="filteredShop">
            <Form.Label>Filter by Shop</Form.Label>
            <Form.Control
              as="select"
              value={filteredShop}
              onChange={(e) => setFilteredShop(e.target.value)}
            >
              <option value="">All Shops</option>
              {shops.map((shop, index) => (
                <option key={index} value={shop}>
                  {shop}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="filteredCategory">
            <Form.Label>Filter by Category</Form.Label>
            <Form.Control
              as="select"
              value={filteredCategory}
              onChange={(e) => setFilteredCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3" controlId="filterStatus">
            <Form.Check
              type="radio"
              label="All"
              name="statusFilter"
              value="all"
              checked={filterStatus === "all"}
              onChange={() => setFilterStatus("all")}
            />
            <Form.Check
              type="radio"
              label="Bought"
              name="statusFilter"
              value="bought"
              checked={filterStatus === "bought"}
              onChange={() => setFilterStatus("bought")}
            />
            <Form.Check
              type="radio"
              label="Not Bought"
              name="statusFilter"
              value="not-bought"
              checked={filterStatus === "not-bought"}
              onChange={() => setFilterStatus("not-bought")}
            />
          </Form.Group>
        </Form>


      </div>

      

      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Shop</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <StyledTable isBought={product.isBought}>
                  {product.id}
                </StyledTable>
                <StyledTable isBought={product.isBought}>
                  {product.name}
                </StyledTable>
                <StyledTable isBought={product.isBought}>
                  {product.shop}
                </StyledTable>
                <StyledTable isBought={product.isBought}>
                  {product.category}
                </StyledTable>
                <td>
                  <Button onClick={() => handleToggleBought(product.id)}>
                    {product.isBought ? "Mark as Not Bought" : "Mark as Bought"}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
