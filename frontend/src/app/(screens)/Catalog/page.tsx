"use client";
import { useState, useEffect } from "react";
import ProductCard from "../../../components/shared/ProductCard";
import Sidebar from "../../../components/catalog/Sliderbar";
import productsData from "../../../Data/mainPage/cardSection/products.json";
import categoriesData from "@/Data/categories/categorie.json";
import Wrapper from "@/app/wrapper";
import Filters from "@/components/shared/Filters";
import ProductSection from "@/components/main/ProductSection";
import useWishlistStore from "@/store/useWishlistStore";
import useProductStore from "@/store/productStore";

const CatalogPage = () => {
    const { toggleWishlist, isInWishlist } = useWishlistStore();
    const { bestSellers, newArrivals, fetchProducts, blogs } = useProductStore();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(newArrivals || []);
  const [totalProducts, setTotalProducts] = useState(productsData.newArrivals.length);
  const [sortBy, setSortBy] = useState("relevance");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    skinType: [] as string[],
    priceRange: [] as string[],
    minPrice: '',
    maxPrice: ''
  });

  // Handle category selection
  const handleCategoryClick = (categorySlug: string) => {
    setActiveCategory(prev => prev === categorySlug ? null : categorySlug);
    setActiveSubCategory(null);
  };

  // Handle subcategory selection
  const handleSubCategoryClick = (subCategorySlug: string) => {
    setActiveSubCategory(prev => prev === subCategorySlug ? null : subCategorySlug);
  };

  // Prepare sidebar sections
  const collapsibleSections = categoriesData.map((category) => ({
    key: category.slug,
    title: category.name,
    href: '#', // Dummy href for Link component
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      handleCategoryClick(category.slug);
    },
    isActive: activeCategory === category.slug,
    items: category.subcategories.map((sub) => ({
      label: sub.name,
      href: '#', // Dummy href
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        handleSubCategoryClick(sub.slug);
      },
      isActive: activeSubCategory === sub.slug,
    })),
  }));

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(value) ? value : [value]
    }));
  };

  // Handle price range input
  const handlePriceInput = (type: 'min' | 'max', value: string) => {
    setFilters(prev => ({
      ...prev,
      [`${type}Price`]: value
    }));
  };

  // Apply all filters
  useEffect(() => {
    let filtered = [...productsData.newArrivals];

    // Apply category filter
    if (activeCategory) {
      filtered = filtered.filter(product => 
        product.categories?.includes(activeCategory)
      );
    }

    // Apply subcategory filter
    if (activeSubCategory) {
      filtered = filtered.filter(product => 
        product.subcategories?.includes(activeSubCategory)
      );
    }

    // Apply skin type filter
    if (filters.skinType.length > 0 && !filters.skinType.includes('All')) {
      filtered = filtered.filter(product =>
        filters.skinType.some(type => product.skinTypes?.includes(type))
      );
    }

    // Apply price range filter
    if (filters.priceRange.length > 0) {
      filtered = filtered.filter(product => {
        const price = Number(product.price);
        return filters.priceRange.some(range => {
          if (range === 'Under $25') return price < 25;
          if (range === '$25 - $50') return price >= 25 && price <= 50;
          if (range === '$50 - $100') return price >= 50 && price <= 100;
          return true;
        });
      });
    }

    // Apply custom price range
    if (filters.minPrice || filters.maxPrice) {
      const min = filters.minPrice ? Number(filters.minPrice) : 0;
      const max = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
      filtered = filtered.filter(product => {
        const price = Number(product.price);
        return price >= min && price <= max;
      });
    }

    // Apply sorting
    if (sortBy === "lowest") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "highest") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredProducts(filtered);
    setTotalProducts(filtered.length);
  }, [activeCategory, activeSubCategory, filters, sortBy]);

  const addToCart = (product: any) => {
    setCartItems((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  return (
    <Wrapper>
      <div className="flex md:flex-row flex-col gap-[20px] pt-[40px]">
        <div className="md:max-w-[250px] w-full max-h-[80vh] overflow-y-auto">
          <Sidebar
            title="Shop All"
            collapsibleSections={collapsibleSections}
          />
          <Filters 
            onFilterChange={handleFilterChange}
            onPriceInput={handlePriceInput}
          />
        </div>

        <main className="flex-1">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">{totalProducts} Products</p>
            <div>
              <label className="mr-[12px] text-gray-600">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-[10px] rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="lowest">Lowest Price</option>
                <option value="highest">Highest Price</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative pt-[30px]">
            {filteredProducts.map((product: any) => (
               <ProductCard
               key={product.id} 
               product={product as any}
               addToCart={() => addToCart(product.id)}
               toggleWishlist={() => toggleWishlist(product.id)}
               isInWishlist={
                 typeof isInWishlist === "function"
                   ? isInWishlist(product.id)
                   : false
               }
             />
            ))}
          </div>

          <div className="flex flex-col items-center my-[20px] gap-[10px]">
            <div className="flex items-center gap-2">
              <button className="text-[#383838] text-[14px] font-medium">
                Show More
              </button>
              <img src="/svgs/seemore/arrow.svg" alt="" />
            </div>

            <div className="flex items-center gap-[20px] mt-2">
              <div className="w-[20px]">
                <img src="/svgs/Shared/ProductSection/leftArrow.svg" alt="" />
              </div>
              <button className="text-[#383838] text-[16px] font-regular leading-[24px]">
                1
              </button>
              <button className="text-[#383838] text-[16px] font-regular leading-[24px]">
                2
              </button>
              <span className="text-[#383838] text-[16px] font-regular leading-[24px]">
                ...
              </span>
              <button className="text-[#383838] text-[16px] font-regular leading-[24px]">
                7
              </button>
              <div className="w-[20px]">
                <img src="/svgs/Shared/ProductSection/rightArrow.svg" alt="" />
              </div>
            </div>
          </div>

          <ProductSection
            title="Recently Viewed Products"
            products={productsData.bestSellers}
            cardWidth={289}
          />
        </main>
      </div>
    </Wrapper>
  );
};

export default CatalogPage;