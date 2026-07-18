import Layout from "../../components/layout/Layout";
import Hero from "../../components/common/Hero";
import Features from "../../components/common/Features";
import HowItWorks from "../../components/common/HowItWorks";

function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
    </Layout>
  );
}

export default Home;