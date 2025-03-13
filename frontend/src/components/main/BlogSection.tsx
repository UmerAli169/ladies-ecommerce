import React, { useEffect } from 'react'
import ProductSection from './ProductSection'
import { useProductStore } from '@/store/productStore';
// import productsData from "../../Data/mainPage/BlogSection/blog.json"

function BlogSection() {
      const { products, fetchProducts }:any = useProductStore();
    
      useEffect(() => {
        fetchProducts()
      }, []);
    return (
        <ProductSection title="ON THE BLOG" products={products} cardWidth={392} />

    )
}

export default BlogSection