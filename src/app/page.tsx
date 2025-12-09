import { SubNavbar } from "@/components/navbar/sub-navbar";
import { DevelTool } from "@/components/sections/develtool";
import { Popular } from "@/components/sections/popular";
import { TrendingTools } from "@/components/sections/trendingTools";
import WelcomePage from "@/components/ui/welcome-Page";
import { ssr } from "@/utils/consitants/api";

export default async function Home() {
  const safeFetch = async <T,>(fetcher: () => Promise<T>, fallback: T, label: string): Promise<T> => {
    try {
      return await fetcher();
    } catch (error) {
      console.error(`Failed to load ${label}`, error);
      return fallback;
    }
  };

  const [sb, tt, popular, dp] = await Promise.all([
    safeFetch(ssr.getSn, { data: { categories: [], subcategories: [] } }, "sub-categories"),
    safeFetch(ssr.getTT, { data: [] }, "trending tools"),
    safeFetch(ssr.getPopular, { data: [] }, "popular tools"),
    safeFetch(ssr.getDp, { data: [] }, "developer tools"),
  ]);

  return (
    <main className="container mx-auto">
      <SubNavbar data={sb} />
      <WelcomePage /> 
      <Popular data={popular}/>
      {/* <NewFun data={nf} /> */}
      <TrendingTools data={tt}/>
      <DevelTool data={dp} />
    </main>
  );
}
