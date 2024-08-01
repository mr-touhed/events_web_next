import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { format } from 'date-fns';

const EventCard = ({event}) => {
    return (
        <article className='max-w-64 border p-4 flex flex-col gap-2 items-start'>
                <div className='max-w-58  bg-slate-400 rounded-md overflow-hidden'>
                    <Image alt="image" className='w-full h-auto object-cover' src={event.image} width={400} height={400}/>
                </div>
                <h2 className='text-xl font-semibold'>{event.title}6</h2>
                <h4 className='text-gray-600'>{format(new Date(event?.dateInfo.date),"dd-mm-yyy")} {event.dateInfo.time} {event.location} </h4>
                <p className='text-primary font-semibold'>Tickets from ${event.price}</p>
                <p className='text-sm text-gray-800 text-justify'>{event.details.lenght > 75 ?  `${event.details.slice(0,75)}...`: event.details }</p>
                <div>
                    <Button className="text-white">
                        <Link href={`events/details/${event._id}`}>ticket & details</Link>
                    </Button>
                </div>
        </article>
    );
};

export default EventCard;