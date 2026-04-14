import { useEffect, useState } from "react";
import API from "./api";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/products");
      setProducts(res.data);
      setMessage("");
    } catch (error) {
      setMessage("Unable to load products. Please check the server and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (event) => {
    event.preventDefault();

    if (!name.trim() || !price.trim()) {
      setMessage("Please enter both product name and price.");
      return;
    }

    try {
      setIsSaving(true);
      await API.post("/products", { name: name.trim(), price: price.trim() });
      setName("");
      setPrice("");
      setMessage("Product added successfully.");
      fetchProducts();
    } catch (error) {
      setMessage("Could not add the product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark">FC</div>
        <div>
          <p className="eyebrow">Farm to table network</p>
          <strong>FarmConnect</strong>
        </div>
      </header>

      <section className="hero-card">
        <div className="hero-content">
          <p className="eyebrow">Fresh from local farms</p>
          <h1>FarmConnect</h1>
          <p className="hero-copy">
            Keep your produce listings tidy, clear, and ready for buyers.
          </p>
        </div>

        <form className="product-form" onSubmit={addProduct}>
          <h2>Add Product</h2>
          <label>
            Product name
            <input
              placeholder="e.g. Organic tomatoes"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Price
            <input
              placeholder="e.g. 80 per kg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Adding..." : "Add product"}
          </button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </section>

      <section className="products-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Inventory</p>
            <h2>Available Products</h2>
          </div>
          <span className="product-count">{products.length} listed</span>
        </div>

        {isLoading ? (
          <div className="state-card">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="state-card">
            No products yet. Add your first farm item above.
          </div>
        ) : (
          <ul className="product-grid">
            {products.map((p) => (
              <li className="product-card" key={p.id}>
                <span className="product-icon">FC</span>
                <div>
                  <h3>{p.name}</h3>
                  <p>Rs. {p.price}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
