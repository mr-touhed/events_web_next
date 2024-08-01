import EventsInfo from "@/components/Home/EventsInfo";
import HeroSlider from "@/components/Home/HeroSlider";
import { Suspense } from "react";

const get_Events = async () =>{
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/events`,{next:{tags:"events"}})
        const data = await res.json()
        return data.data
    } catch (error) {
      
    }
}
export default async  function Home() {
  const data = await get_Events()
  return (
  <main className="grid grid-cols-1 gap-16">
       
       <HeroSlider/>
       <Suspense >

       <EventsInfo data={data}/>
       </Suspense>
  </main>
  );
}
