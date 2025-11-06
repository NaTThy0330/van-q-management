/* eslint-disable no-console */
const mongoose = require("mongoose");
const connectDatabase = require("../src/config/database");
const config = require("../src/config/env");
const { hashPassword } = require("../src/utils/password");
const {
  Passenger,
  Driver,
  Van,
  Route,
  Trip,
  Queue,
  Payment,
  TicketHistory,
  LocationUpdate,
} = require("../src/models");

const seed = async () => {
  await connectDatabase();

  await Promise.all([
    Passenger.deleteMany({}),
    Driver.deleteMany({}),
    Van.deleteMany({}),
    Route.deleteMany({}),
    Trip.deleteMany({}),
    Queue.deleteMany({}),
    Payment.deleteMany({}),
    TicketHistory.deleteMany({}),
    LocationUpdate.deleteMany({}),
  ]);

  const [passengerPassword, driverPassword, adminPassword] = await Promise.all([
    hashPassword("passenger123"),
    hashPassword("driver123"),
    hashPassword("admin123"),
  ]);

  const passengerUser = await Passenger.create({
    name: "Somchai Jaidee",
    email: "somchai@example.com",
    phone: "0812345678",
    passwordHash: passengerPassword,
    role: "passenger",
  });

  const driverUser = await Passenger.create({
    name: "Narin Wong",
    email: "driver@example.com",
    phone: "0899999999",
    passwordHash: driverPassword,
    role: "driver",
  });

  const adminUser = await Passenger.create({
    name: "Admin User",
    email: "admin@example.com",
    phone: "0800000000",
    passwordHash: adminPassword,
    role: "admin",
  });

  const routes = await Route.insertMany([
    { origin: "Thammasat", destination: "Victory Monument", distanceKm: 40 },
    { origin: "Thammasat", destination: "Chatuchak", distanceKm: 35 },
    { origin: "Thammasat", destination: "Future Park", distanceKm: 15 },
  ]);

  const van = await Van.create({
    plateNumber: "VAN-2025",
    model: "Toyota Commuter",
    seatCapacity: 13,
    status: "active",
  });

  const driver = await Driver.create({
    name: "Narin Wong",
    phone: "0899999999",
    licenseNo: "D1234567",
    assignedVan: van._id,
    userId: driverUser._id,
  });

  van.driverId = driver._id;
  await van.save();

  const trip = await Trip.create({
    routeId: routes[0]._id,
    vanId: van._id,
    departTime: new Date(Date.now() + 60 * 60 * 1000),
    status: "scheduled",
  });

  console.log("Seed data inserted successfully");
  console.log("Sample credentials:");
  console.log(`Passenger -> ${passengerUser.email} / passenger123`);
  console.log(`Driver -> ${driverUser.email} / driver123`);
  console.log(`Admin -> ${adminUser.email} / admin123`);
  console.log(`MongoDB -> ${config.mongoUri}`);
};

seed()
  .then(() => mongoose.connection.close())
  .catch((error) => {
    console.error("Seed failed", error);
    mongoose.connection.close(() => process.exit(1));
  });
