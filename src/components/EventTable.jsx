"use client"
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import Image from "next/image";
import { format } from 'date-fns';
import revalideTag from "@/lib/revalideTag";
import toast from "react-hot-toast";

const EventTable = ({data}) => {
 
        const handel_Delete = async (id) =>{
                try {
                        const res = await fetch(`/api/events/${id}`, {
                                method:"DELETE",
                                
                        })
                        const result = await res.json();
                        if(result.status){
                                revalideTag("events")
                                toast("Your Event Remove Successfully")
                        }else{
                                alert("some problem")
                        }
                } catch (error) {
                        console.log(error);
                }
        }

    return (
        <div className="container">
            <Table>
            <TableHeader>
                    <TableRow>
                                <TableHead>
                                        Image
                                </TableHead>
                                <TableHead>
                                        Title
                                </TableHead>
                                <TableHead>
                                        Price
                                </TableHead>
                                <TableHead>
                                category
                                </TableHead>
                                <TableHead>
                                Date
                                </TableHead>
                                <TableHead>
                                location
                                </TableHead>
                                <TableHead>
                               <Button className="bg-green-600 text-white">
                               <Link href="/dashboard/add-event" >Add new Event</Link>
                               </Button>
                                </TableHead>
                    </TableRow>
            </TableHeader>
                    <TableBody>

                      {data && data?.map(row => <TableRow key={row._id}>
                                    <TableCell>
                                           {row.image !== "https://image.com" && <Image src={row.image} alt="image" width={150} height={150} className="w-16 h-16"/>}
                                    </TableCell>
                                    <TableCell>
                                            {row.title}
                                    </TableCell>
                                    <TableCell>
                                            {row.price}
                                    </TableCell>
                                    <TableCell>
                                            {row.category}
                                    </TableCell>
                                    <TableCell>
                                            <p>{format(new Date(row.dateInfo.date), 'dd MMMM yyyy')}</p>
                                            <p>{row.dateInfo.time}</p>
                                    </TableCell>
                                    <TableCell>
                                            {row.location}
                                    </TableCell>
                                    <TableCell className="flex gap-4 justify-end items-center">
                                            
                                            <Link className="text-green-700 font-bold" href={`/dashboard/events/edit/${row._id}`}>Edit</Link>

                                            <Button className="text-white" onClick={()=>handel_Delete(row._id)}>X</Button>
                                    </TableCell>
                        </TableRow>)  }
                    </TableBody>
            </Table>
        </div>
    );
};

export default EventTable;