import { useState } from 'react';
import { CreateProduct } from '../Services/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ProductForm() {
  const [product, setProduct] = useState({ name: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Debugging: Log the product data before sending
    console.log('Submitting Product:', product);
  
    CreateProduct({ ...product, price: parseFloat(product.price) })
      .then(() => {
        toast.success('Product created successfully!', { position: "top-right" });
        
        // 🛠 Clear the form by resetting state
        setProduct({ name: '', price: '' });
      })
      .catch((error) => {
        toast.error('Error creating product!', { position: "top-right" });
        console.error('Error:', error);
      });
  };
  
  

  return (
    <div className="container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default ProductForm;