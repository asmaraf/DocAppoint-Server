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
    fee: 800, rating: 4.9, reviewsCount: 38
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
    fee: 1000, rating: 4.8, reviewsCount: 42
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
    fee: 750, rating: 4.9, reviewsCount: 51
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
    fee: 1200, rating: 4.7, reviewsCount: 29
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
    fee: 700, rating: 4.9, reviewsCount: 64
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
    fee: 650, rating: 4.8, reviewsCount: 31
  },
  {
    customId: "d7",
    name: "Dr. Farhan Kabir",
    specialty: "Oncologist",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600",
    experience: "14 years",
    availability: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
    description: "Specialist in diagnosing and treating various cancers with the latest chemotherapy and immunotherapy protocols.",
    hospital: "BIRDEM General Hospital",
    location: "Shahbag, Dhaka",
    fee: 1500, rating: 4.8, reviewsCount: 22
  },
  {
    customId: "d8",
    name: "Dr. Rezwana Islam",
    specialty: "Gynecologist",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=600",
    experience: "11 years",
    availability: ["08:30 AM - 12:30 PM", "02:00 PM - 05:00 PM"],
    description: "Experienced gynecologist focused on maternal healthcare, high-risk pregnancies, and women's reproductive wellness.",
    hospital: "Anwer Khan Modern Hospital",
    location: "Dhanmondi, Dhaka",
    fee: 900, rating: 4.9, reviewsCount: 57
  },
  {
    customId: "d9",
    name: "Dr. Imtiaz Ahmed",
    specialty: "Gastroenterologist",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=600",
    experience: "13 years",
    availability: ["11:00 AM - 02:00 PM", "05:00 PM - 08:00 PM"],
    description: "Expert in digestive health, treating conditions like IBS, liver disease, GERD, and complex bowel disorders.",
    hospital: "Dhaka Medical College Hospital",
    location: "Bakshibazar, Dhaka",
    fee: 850, rating: 4.7, reviewsCount: 33
  },
  {
    customId: "d10",
    name: "Dr. Samira Akter",
    specialty: "Ophthalmologist",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=600",
    experience: "6 years",
    availability: ["09:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"],
    description: "Specialized eye care physician providing cataract surgery, LASIK consultation, and pediatric eye treatments.",
    hospital: "National Institute of Ophthalmology",
    location: "Agargaon, Dhaka",
    fee: 600, rating: 4.8, reviewsCount: 45
  },
  {
    customId: "d11",
    name: "Dr. Zahidul Karim",
    specialty: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?auto=format&fit=crop&q=80&w=600",
    experience: "10 years",
    availability: ["10:00 AM - 01:00 PM", "04:00 PM - 06:00 PM"],
    description: "Mental health specialist offering evidence-based therapy for anxiety, depression, PTSD, and mood disorders.",
    hospital: "National Institute of Mental Health",
    location: "Sher-e-Bangla Nagar, Dhaka",
    fee: 750, rating: 4.7, reviewsCount: 19
  },
  {
    customId: "d12",
    name: "Dr. Tasnia Begum",
    specialty: "Endocrinologist",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=600",
    experience: "8 years",
    availability: ["09:00 AM - 12:00 PM", "03:00 PM - 06:00 PM"],
    description: "Hormone health specialist managing diabetes, thyroid disorders, adrenal conditions, and metabolic diseases.",
    hospital: "BSMMU Hospital",
    location: "Shahbag, Dhaka",
    fee: 700, rating: 4.8, reviewsCount: 26
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
