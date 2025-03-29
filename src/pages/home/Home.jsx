import { Link } from "react-router-dom";
import Filter from "../../components/filter/Filter";
import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/productCard/ProductCard";
import Testimonial from "../../components/testimonial/Testimonial";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <div className="flex justify-center mt-10 mb-4">
        <Link to={"/allproducts"}>
          <button className="bg-gray-300  px-5 py-2 rounded-xl">See more</button>
        </Link>
      </div>
      <Testimonial />
    </Layout>
  );
}
