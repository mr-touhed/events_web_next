
'use server'
 
import { revalidateTag } from 'next/cache'
const revalideTag = (name) =>{
    return revalidateTag(name)
}

export default revalideTag;