import {prisma} from "@/lib/prisma";
import bcrypt from 'bcryptjs'


export function register() {
    init().then(_ => console.log("DB Initialized"))
}

/**
 * admin 사용자 초기화
 * */
const init = async () => {
    const adminList = await prisma.admin.count()

    const id = process.env.ROOT_ADMIN_ID ?? 'admin'
    const name = process.env.ROOT_ADMIN_NAME ?? 'admin'

    const originalPassword = process.env.ROOT_ADMIN_PASSWORD ?? 'password'
    const password = await bcrypt.hash(originalPassword, 12)

    if (adminList === 0) {
        await prisma.admin.create({
            data: {
                id, name, password
            }
        })
    }
}