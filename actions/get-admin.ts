'use server'

import {prisma} from "@/lib/prisma";

const getAdmin = async () => {
    const admins = await prisma.admin.findMany()

    return admins
}

export default getAdmin