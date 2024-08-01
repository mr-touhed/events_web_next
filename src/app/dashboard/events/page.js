
import EventTable from "@/components/EventTable";
import { Suspense } from "react";



const page = async  () => {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/events`, {next:{tags:["events"]}});
            const result = await res.json();
         console.log(`${process.env.NEXTAUTH_URL}/api/events`);
    return (
        <div>
                <Suspense fallback="Loading.....">
                <EventTable data={result.data}/>
                </Suspense>

           
        </div>
    );
};

export default page;