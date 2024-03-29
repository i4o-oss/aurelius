import { prisma } from '~/db.server'
export type { User } from '@prisma/client'

export async function getUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	return user
}

export async function getUserById(id: string) {
	return prisma.user.findUnique({ where: { id } })
}

export async function getUserProfile(id: string) {
	return prisma.user.findUnique({
		select: { name: true, bio: true, username: true },
		where: { id },
	})
}

export async function getUserByUsername(username: string) {
	return prisma.user.findUnique({
		select: { id: true, username: true, name: true, bio: true },
		where: { username },
	})
}

export async function checkUsername(username: string) {
	const user = await prisma.user.findUnique({
		where: { username },
	})

	if (!user) {
		return true
	} else {
		return false
	}
}

export async function updateUser(id: string, data: any) {
	return await prisma.user.update({
		data,
		where: {
			id,
		},
	})
}

// @ts-ignore
export async function findOrCreateUser(email: string, name: string) {
	let user = await getUserByEmail(email)
	if (user) {
		return user
	} else {
		const newUser = await createUser({ email, name })
		return newUser
	}
}

interface CreateUserParams {
	email: string
	name?: string
}

export async function createUser({ email, name = '' }: CreateUserParams) {
	// TODO: send welcome email
	const user = await prisma.user.create({
		data: {
			email,
			name,
		},
	})

	return user
}
