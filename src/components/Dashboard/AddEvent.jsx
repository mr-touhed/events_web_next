"use client"
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { useEffect, useState } from 'react';
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon, Terminal } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { cn } from "@/lib/utils"
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import revalideTag from '@/lib/revalideTag';
const AddEvent = () => {
    const [date, setDate] = useState(new Date());
   
    const [event,setEvent] = useState({
        title: '',
        details: '',
        price: '',
        image: '',
        category: '',
        date: '',
        time: '',
        location: '',
       
    })
    const [alert,setAlert] = useState(false)
    useEffect(()=>{
            if(alert){
                setTimeout(() => {
                setAlert(false)
                }, 3000);
            }
            console.log(alert);
    },[alert])

    const change_input = (e) =>{
        const label = e.target.name;
        const value = e.target.value;
        setEvent(prev => ({...prev, [label]:value }))
    }
    
    const handel_events = async(e) => {
        e.preventDefault()
        try {

            const isImgBBUrl = event.image.includes('imgbb.com') || event.image.includes('ibb.co');
                if(!isImgBBUrl){
                   return  alert("use imgbb url only")
                }

            const newEvent = {...event, date};
            
            const res = await fetch("/api/events", {
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(newEvent)
            })
            const result = await res.json();
            
            if(result.status){
                
                setAlert(true)
                setEvent({
                    title: '',
                    details: '',
                    price: '',
                    image: '',
                    category: '',
                    date: '',
                    time: '',
                    location: '',
                   
                })
                revalideTag("events")
            }else{
                console.log("lndsfksdgnsdkgnsdgkn");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container '>
             <h2 className='text-center text-2xl '>Add events</h2>
            <form onSubmit={handel_events}>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="title">Title</Label>
                            <Input type="text" id="title" placeholder="Event Title" name="title" value={event.title}  onChange={e => change_input(e)} />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="price">Price</Label>
                            <Input type="text" id="name" placeholder="Price" name="price" value={event.price} onChange={e => change_input(e)} />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="image">Image URL</Label>
                            <Input type="text" id="image" placeholder="Use Imgbb url only" name="image" value={event.image} onChange={e => change_input(e)}  />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="catagory">Catagory</Label>
                            <Select value={event.category} onValueChange={value => setEvent(prev => ({...prev,category:value }))}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Catagory" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup className='bg-white'>
          <SelectLabel>Catagory</SelectLabel>
          <SelectItem value="Conference">Conference</SelectItem>
          <SelectItem value="Workshops">Workshops</SelectItem>
          <SelectItem value="Concerts">Concerts</SelectItem>
         
        </SelectGroup>
      </SelectContent>
    </Select>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="name">Date</Label>
                            <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                        >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-white">
                                        <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        />
                                    </PopoverContent>
                                    </Popover>
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="time">Time</Label>
                            <Input type="text" id="time" placeholder="6PM-8PM" name="time" value={event.time} onChange={e => change_input(e)}  />  
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="location">Location</Label>
                            <Input type="text" id="location" placeholder="location" name="location" value={event.location} onChange={e => change_input(e)}  />  
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="time">Details</Label>
                            <Textarea type="text" id="details" placeholder="details" name="details" value={event.details} onChange={e => change_input(e)}  />  
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto mt-6">
                            <Button className="text-white">Add Event</Button> 
                            </div>
                            
            </form>



            {alert &&  <Alert className={`absolute bottom-5 z-10 right-0 max-w-[40%] bg-white `} onClick={()=> setAlert(false)}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Add New Event Successfully
      </AlertDescription>
    </Alert>}
        </div>
    );
};

export default AddEvent;