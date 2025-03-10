import Dashboard from '../../components/main/Dashboard';
import ProductSection from '../../components/main/ProductSection'
import productsData from '../../Data/mainPage/cardSection/products.json'
import React from 'react';
import Frame from '../../components/main/Frame';
import BlogSection from '../../components/main/BlogSection';
import SkinQuiz from '@/components/main/SkinQuiz';
import InstagramGallery from '../../components/main/InstagramGallery';
function MainPage() {
  return (
    <div>
         <Dashboard />
         <ProductSection title="NEW ARRIVALS" products={productsData.newArrivals} cardWidth={289} />
         <ProductSection title="BEST SELLERS" products={productsData.bestSellers} cardWidth={289} />
         <Frame/>
         <BlogSection/>
         <SkinQuiz/>
         <InstagramGallery/>
   
    </div>
  );
}

export default MainPage;
