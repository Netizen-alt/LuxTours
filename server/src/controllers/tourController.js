const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllTours = async (req, res) => {
  try {
    const tours = await prisma.tour.findMany();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await prisma.tour.findUnique({
      where: { id: req.params.id },
    });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTour = async (req, res) => {
  try {
    // Admin check logic could go here or middleware
    const { title, description, price, duration, startDate, image } = req.body;
    const tour = await prisma.tour.create({
      data: {
        title,
        description,
        price,
        duration,
        startDate: new Date(startDate),
        image
      }
    });
    res.status(201).json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await prisma.tour.update({
      where: { id },
      data: req.body
    });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tour.delete({ where: { id } });
    res.json({ message: 'Tour deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
