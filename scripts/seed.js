const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('../models/Doctor');

dotenv.config();

const seedDoctors = [
  {
    customId: "d1",
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1594824813566-88855ce78c9c?auto=format&fit=crop&q=80&w=600",
    experience: "10 years",
    availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
    description: "Highly experienced cardiologist specializing in heart diseases, preventive care, and patient-centered treatment.",
    hospital: "Labaid Cardiac Hospital",
    location: "Dhanmondi, Dhaka",
    fee: 800,
    rating: 4.9,
    reviewsCount: 38
  },
  {
    customId: "d2",
    name: "Dr. Tanvir Hossain",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    experience: "12 years",
    availability: ["10:00 AM - 01:00 PM", "05:00 PM - 08:00 PM"],
    description: "Expert neurologist focused on stroke recovery, migraine management, and complex neurological disorders.",
    hospital: "Square Hospital",
    location: "Panthapath, Dhaka",
    fee: 1000,
    rating: 4.8,
    reviewsCount: 42
  },
  {
    customId: "d3",
    name: "Dr. Nusrat Jahan",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    experience: "8 years",
    availability: ["09:30 AM - 01:30 PM", "03:30 PM - 06:30 PM"],
    description: "Compassionate child healthcare specialist providing comprehensive neonatal, childhood nutrition, and vaccination services.",
    hospital: "Evercare Hospital",
    location: "Bashundhara, Dhaka",
    fee: 750,
    rating: 4.9,
    reviewsCount: 51
  },
  {
    customId: "d4",
    name: "Dr. Mahmudul Hasan",
    specialty: "Orthopedic Specialist",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    experience: "15 years",
    availability: ["11:00 AM - 02:00 PM", "06:00 PM - 09:00 PM"],
    description: "Renowned orthopedic surgeon specializing in joint replacement, sports injury rehab, and spine wellness.",
    hospital: "United Hospital",
    location: "Gulshan, Dhaka",
    fee: 1200,
    rating: 4.7,
    reviewsCount: 29
  },
  {
    customId: "d5",
    name: "Dr. Sabrina Chowdhury",
    specialty: "Dermatologist",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600",
    experience: "7 years",
    availability: ["10:00 AM - 02:00 PM", "04:30 PM - 07:30 PM"],
    description: "Leading skin specialist offering advanced aesthetic dermatology, acne treatments, and laser skin restoration.",
    hospital: "Ibn Sina Medical College",
    location: "Kalyanpur, Dhaka",
    fee: 700,
    rating: 4.9,
    reviewsCount: 64
  },
  {
    customId: "d6",
    name: "Dr. Shahriar Alam",
    specialty: "Dental Surgeon",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    experience: "9 years",
    availability: ["09:00 AM - 01:00 PM", "03:00 PM - 07:00 PM"],
    description: "Expert dental surgeon specializing in cosmetic dentistry, painless root canals, dental implants, and smile alignment.",
    hospital: "Popular Diagnostic Center",
    location: "Dhanmondi, Dhaka",
    fee: 650,
    rating: 4.8,
    reviewsCount: 31
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'docappoint' });
    console.log('[Seed]: Connected to MongoDB');

    await Doctor.deleteMany({});
    console.log('[Seed]: Cleared existing doctor records');

    await Doctor.insertMany(seedDoctors);
    console.log(`[Seed]: Successfully seeded ${seedDoctors.length} doctors!`);

    process.exit();
  } catch (error) {
    console.error(`[Seed Error]: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
