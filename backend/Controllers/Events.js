const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createEvent = async(req,res) => {
  const { name, date,description, location } = req.body;
  const event = await prisma.event.create({
    data: { name, date : new Date(date),description, location },
  });
  res.json(event);
}

const updateEvent = async (req,res) => {
  const { name, date,description, location } = req.body;
  const event = await prisma.event.update({
    where: { id: parseInt(req.params.id) },
    data: { name, date,description, location },
  });
  res.json(event);
}

const delEvent = async(req, res) => {
  const { id } = req.params;
  try {
    const del = await prisma.event.delete({ where: { id:parseInt(id) } });
    res.json(del);
  } catch (error) {
    res.json(error);
  }
}

const getAll = async(req, res) => {
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'desc'
      }
    });
    res.json(events);
}

const searchEvent = async(req,res) => {
  const { query } = req.query;

  if (!query) {
    return res.json({ error: 'Query parameter is required' });
  }

  const events = await prisma.event.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } },
        { date: {
          gte: new Date(query),
        } }
      ],
    },
  });

  res.json(events);
}

const otherEvents = () => {

}

module.exports = {createEvent, updateEvent, delEvent, getAll, searchEvent};