const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const book = async(req, res) => {
  const { eventId } = req.body;
  try{
  const booking = await prisma.booking.create({
    data: {
      userId: req.user.id,
      eventId: eventId,
    },
  });
  res.json(booking);
  }catch(error){
    if(error.code == 'P2002')
      res.json("booking already done");
    else
    res.json(error);
  }
}

const userBook = async(req, res) => {
    const bookings = await prisma.booking.findMany({
        where: { userId: req.user.id },
        include: { event: true} 
    });
    res.json(bookings);
}


module.exports = { book, userBook};