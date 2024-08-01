"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import EventCard from "../EventCard";

const EventsInfo = ({data}) => {
   
    const tabList = ["All","Conference","Workshops","Concerts"];
    const [activeMenu,setActiveMenu] = useState('All')
    const changeTab = (value) =>{
        setActiveMenu(value)
    }
  return (
    <div className="container">
      <Tabs defaultValue="All" className="" onValueChange={(value) =>changeTab(value)}>
        <TabsList className="grid w-full md:grid-cols-4 grid-cols-2">
            {
                tabList?.map((tab,i) => <TabsTrigger  key={i} value={tab} className={`${activeMenu === tab ? "bg-primary text-white" : ""} hover:text-primary`}>{tab}</TabsTrigger>)
            }
          
        </TabsList>
        <TabsContent value="All" className="grid md:grid-cols-4 gap-6 mt-16">
                {
                    data?.map((event,i) => <EventCard key={i} event={event}/>)
                }
        </TabsContent>
        <TabsContent value="Conference" className="grid grid-cols-4 gap-6">
                {
                    data?.filter(event => event.category === "Conference").map((event,i)=> <EventCard key={i} event={event}/>)
                }
            </TabsContent>
        <TabsContent value="Workshops" className="grid grid-cols-4 gap-6">
                {
                    data?.filter(event => event.category === "Workshops").map((event,i)=> <EventCard key={i} event={event}/>)
                }
        </TabsContent>
        <TabsContent value="Concerts" className="grid grid-cols-4 gap-6">
                {
                    data?.filter(event => event.category === "Concerts").map((event,i)=> <EventCard key={i} event={event}/>)
                }
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsInfo;
