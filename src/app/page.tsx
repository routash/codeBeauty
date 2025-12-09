import { SubNavbar } from "@/components/navbar/sub-navbar";
import { DevelTool } from "@/components/sections/develtool";
import { Popular } from "@/components/sections/popular";
import { TrendingTools } from "@/components/sections/trendingTools";
import WelcomePage from "@/components/ui/welcome-Page";
import { ssr } from "@/utils/consitants/api";

export default async function Home() {
  const sb = await ssr.getSn();
  const tt = await ssr.getTT();
  const popular = await ssr.getPopular();
  // const nf = await ssr.getNf();
  const dp = await ssr.getDp();
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
