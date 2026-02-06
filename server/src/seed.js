const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clean existing
  await prisma.booking.deleteMany();
  await prisma.tour.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleaned database');

  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('Seeded Admin User: admin@example.com / admin123');

  // Create Tours
  await prisma.tour.create({
    data: {
      title: 'Majestic Alps Adventure',
      description: 'Experience the breathtaking views of the Swiss Alps with our premium guided tour. Includes 5-star accommodation and private transport.',
      price: 2499,
      duration: 5,
      startDate: new Date('2024-06-15'),
      image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=1000'
    }
  });

  await prisma.tour.create({
    data: {
      title: 'Kyoto Cultural Retreat',
      description: 'Immerse yourself in the ancient traditions of Japan. Visit temples, tea ceremonies, and bamboo forests.',
      price: 1899,
      duration: 7,
      startDate: new Date('2024-09-10'),
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000'
    }
  });

  await prisma.tour.create({
    data: {
      title: 'Santorini Sunset Cruise',
      description: 'Relax on the waters of the Aegean Sea with a private yacht tour around the beautiful island of Santorini.',
      price: 1299,
      duration: 3,
      startDate: new Date('2024-07-20'),
      image: 'https://images.unsplash.com/photo-1613395877344-13d4c79e4284?auto=format&fit=crop&q=80&w=1000'
    }
  });

  console.log('Seeded 3 tours');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
