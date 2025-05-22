import { useState } from 'react';
import { CreateProduct } from '../Services/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductForm() {
  const [product, setProduct] = useState({ name: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Product:', product);

    CreateProduct({ ...product, price: parseFloat(product.price) })
      .then(() => {
        toast.success('Product created successfully!', { position: 'top-right' });
        setProduct({ name: '', price: '' });
      })
      .catch((error) => {
        toast.error('Error creating product!', { position: 'top-right' });
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-warning text-white">
          <h2 className="mb-0">Create Product</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <input
                type="text"
                className="form-control"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Price</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductForm;