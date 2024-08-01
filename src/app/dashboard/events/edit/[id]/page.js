import EditEvent from '@/components/Dashboard/EditEvent';
import React, { Suspense } from 'react';

const getEvent = async (id) =>{
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/events/${id}`,{next:{tags:["events-edit"]}});
        const data =   await res.json();
        return data.data
    } catch (error) {
        console.log(error);
    }

}
const EditPage = async ({params}) => {
const data = await getEvent(params.id);
const element = <h2 className='text-2xl text-center font-thin'>Loading.....</h2>
    return (
        <div>
            <Suspense fallback={element}>
                    <EditEvent data={data}/>
            </Suspense>
        </div>
    );
};

export default EditPage;