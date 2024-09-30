const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
  const { name, email, password, isAdmin} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {name, email, password: hashedPassword, isAdmin },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
}

const login = async(req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id}, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
}

const getUsers = async (req, res) => {
  try{
    const { email } = req.body;
    const details = await prisma.user.findUnique({ where: { email }});
    res.json(details);
  }catch(error){
    res.json("Error in fetching");
  }
}

const userForEvent = async (req, res) => {

  const eventId  = parseInt(req.params.id);
  try{
  const users = await prisma.user.findMany({
    where: {
      bookings: {
        some: {
          eventId: eventId 
        }
      }
    },
    include: {
      bookings: {
        where: {
          eventId: eventId 
        }
      }
    }
      }
  );
  console.log(users);
  res.json(users);
} catch (error) {
  console.error('Error fetching users:', error);
}
}
module.exports = {register, login, getUsers, userForEvent};