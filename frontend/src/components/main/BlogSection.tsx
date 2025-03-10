import React from 'react'
import ProductSection from './ProductSection'
import productsData from "../../Data/mainPage/BlogSection/blog.json"

function BlogSection() {
    return (
        <ProductSection title="ON THE BLOG" products={productsData.blogSection} cardWidth={392} />

    )
}

export default BlogSection