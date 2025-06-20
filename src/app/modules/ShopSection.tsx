"use client"

import React, { useEffect, useState } from 'react';
import { API_URL } from '@/constants/urls';
import { Product } from '@/types/Product';
import ProductCard from '@/components/ProductCard';

const ShopSection = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(()=>{
    const handleFetchProducts= async()=>{
      try {
        let url = `${API_URL}/products`;
        let response = await fetch(url);
        if(response.status !== 200){
          console.log("Could not fetch products");
          return;
        }
        let result = await response.json();

        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    }

    handleFetchProducts();
  }, []);
  return (
    <div className='w-full bg-black min-h-screen p-6 md:p-12'>
        <h2 className='text-8xl'>Products</h2>
        <div className='flex flex-col w-full md:flex-row md:items-center gap-4 my-8 flex-wrap'>
          {
            products.map((product:any) => <ProductCard 
                                                id={product.id}
                                                key={product.slug}
                                                title={product.title}
                                                description={product.description}
                                                image={product.image}
                                                price={product.price}
                                                stock={product.stock}
                                                slug={product.slug}
                                                category={product.category}
                                              />)
          }
        </div>
    </div>
  )
}

export default ShopSection