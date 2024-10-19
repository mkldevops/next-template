import { faker } from "@faker-js/faker";
import { type Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
	const users = [];
	for (let i = 0; i < 20; i++) {
		const user = {
			email: faker.internet.email(),
			name: faker.person.fullName(),
			username: faker.internet.userName(),
			image: faker.image.avatar(),
			bio: faker.lorem.sentence(),
			link: faker.internet.url(),
		} satisfies Prisma.UserCreateInput;

		const dbUser = await prisma.user.create({ data: user });

		users.push(dbUser);
	}
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
