import React, { useEffect, useState } from 'react';
import http_common from '../../../http_common';
import { Carousel } from 'react-bootstrap';
import { APP_ENV } from '../../../env';
import { IProduct } from './types';

const ProductListPage = () => {
  const [products, setList] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    http_common
        .get<IProduct[]>("api/product")
        .then((resp) => {
            console.log("Categories", resp.data);
            setList(resp.data);
        });
  };


  return (
    <div className="container">
      <h1 className="mt-4 mb-3">Product List</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <Carousel>
                {product.product_images.map((image) => (
                  <Carousel.Item key={image.id}>
                    <img
                      className="d-block w-100"
                      src={`${APP_ENV.BASE_URL}uploads/product/${image.name}`}
                      alt={`Product ${product.id}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <h6 className="card-subtitle mb-2 text-muted">${product.price}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;