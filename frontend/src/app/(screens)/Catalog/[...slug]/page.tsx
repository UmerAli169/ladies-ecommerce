"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import categoriesData from "@/Data/categories/categorie.json";
import Wrapper from "@/app/wrapper";
import Sidebar from "@/components/shared/Sidebar";
import SubCategoryProduct from "./SubCategoryProduct";
import Filters from "@/components/shared/Filters";

export default function CatalogPage() {
  const router = useRouter();
  const { slug }: any = useParams();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!slug) return;

    let selectedCategory: any = categoriesData;
    for (const slugPart of slug) {
      selectedCategory =
        selectedCategory.find((cat: any) => cat.slug === slugPart)
          ?.subcategories || [];
    }

    if (selectedCategory.length === 0) {
      router.push("/catalog");
      return;
    }

    setCurrentCategory(selectedCategory);
  }, [slug, router]);

  if (!currentCategory) return <p className="text-center py-10">Loading...</p>;

  return (
    <Wrapper>
      <div className="flex py-10 gap-6 lg:flex-row flex-col">
        <div className="lg:max-w-[250px] w-fill flex flex-col gap-6">
          <Sidebar
            title="Shop by Category"
            collapsibleSections={currentCategory?.map((sub: any) => ({
              key: sub.slug,
              title: sub.name,
              href: `/catalog/${slug.join("/")}/${sub.slug}`,
              items: [],
            }))}
          />
          <Filters />
        </div>

        <div className="flex-1">
          <SubCategoryProduct products={products} />
        </div>
      </div>
    </Wrapper>
  );
}
