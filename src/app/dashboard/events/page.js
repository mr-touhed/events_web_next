
import EventTable from "@/components/EventTable";
import { Suspense } from "react";



const page = async  () => {
            const res = await fetch(`https://eventsnext.netlify.app/api/events`, {next:{tags:["events"]}});
            const result = await res.json();
         
    return (
        <div>
                <Suspense fallback="Loading.....">
                <EventTable data={result?.data}/>
                </Suspense>

           
        </div>
    );
};

export default page;