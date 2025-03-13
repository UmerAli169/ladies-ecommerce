"use client"
import Dashboard from '../../components/main/Dashboard';
import ProductSection from '../../components/main/ProductSection'
// import productsData from '../../Data/mainPage/cardSection/products.json'
import React, { useEffect } from 'react';
import Frame from '../../components/main/Frame';
import BlogSection from '../../components/main/BlogSection';
import SkinQuiz from '@/components/main/SkinQuiz';
import InstagramGallery from '../../components/main/InstagramGallery';
import { useProductStore } from '@/store/productStore';
function MainPage() {
  const { products, fetchProducts }:any = useProductStore();
  
    useEffect(() => {
      fetchProducts()
      
    }, []);
  
  return (
    <div>
         <Dashboard />
         <ProductSection title="NEW ARRIVALS" products={products} cardWidth={289} />
         <ProductSection title="BEST SELLERS" products={products} cardWidth={289} />
         <Frame/>
         <BlogSection/>
         <SkinQuiz/>
         <InstagramGallery/>
   
    </div>
  );
}

export default MainPage;
