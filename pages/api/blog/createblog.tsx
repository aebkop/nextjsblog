import type { NextApiRequest, NextApiResponse } from 'next'
import { getDB } from '../../../lib/db'

export const createBlog = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body == null) { return }
    const { name, titleimage, userid } = req.body
    addBlogtoDb(name,titleimage,userid)
    res.status(201).send
}
//TODO Add titleimage
const addBlogtoDb = async (name: string, titleimage: string, user_id: string) => {
    const { db } = getDB();     
    try {
        const users = await db.any(
            'INSERT INTO blogs (name,titleimage, user_id) VALUES ($1,$2,$3)',
            [name,titleimage,user_id]);
    } 
    catch(e) {
        // error
    }   

}


