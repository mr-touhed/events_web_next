
import EventTable from "@/components/EventTable";

const get_events = async () =>{
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/events`, {next:{tags:["events"]}});
            const result = await res.json();
            return result.data;

    } catch (error) {
        console.log(error);
    }
}

const page = async  () => {
            
         const events = await get_events()
    return (
        <div>
                
                <EventTable data={events}/>
               

           
        </div>
    );
};

export default page;