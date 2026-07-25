const bcrypt = require('bcryptjs');

let doctors = [
  {
    _id: "d1",
    customId: "d1",
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    experience: "10 years",
    availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
    description: "Highly experienced cardiologist specializing in heart diseases, preventive care, and patient-centered treatment plans.",
    hospital: "Labaid Cardiac Hospital",
    location: "Dhanmondi, Dhaka",
    fee: 800,
    rating: 4.9,
    reviewsCount: 38
  },
  {
    _id: "d2",
    customId: "d2",
    name: "Dr. Tanvir Hossain",
    specialty: "Neurologist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
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
    _id: "d3",
    customId: "d3",
    name: "Dr. Nusrat Jahan",
    specialty: "Pediatrician",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
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
    _id: "d4",
    customId: "d4",
    name: "Dr. Mahmudul Hasan",
    specialty: "Orthopedic Specialist",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    experience: "15 years",
    availability: ["11:00 AM - 02:00 PM", "06:00 PM - 09:00 PM"],
    description: "Renowned orthopedic surgeon specializing in joint replacement, sports injury rehabilitation, and spine wellness.",
    hospital: "United Hospital",
    location: "Gulshan, Dhaka",
    fee: 1200,
    rating: 4.7,
    reviewsCount: 29
  },
  {
    _id: "d5",
    customId: "d5",
    name: "Dr. Sabrina Chowdhury",
    specialty: "Dermatologist",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
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
    _id: "d6",
    customId: "d6",
    name: "Dr. Shahriar Alam",
    specialty: "Dental Surgeon",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    experience: "9 years",
    availability: ["09:00 AM - 01:00 PM", "03:00 PM - 07:00 PM"],
    description: "Expert dental surgeon specializing in cosmetic dentistry, painless root canals, dental implants, and smile alignment.",
    hospital: "Popular Diagnostic Center",
    location: "Dhanmondi, Dhaka",
    fee: 650,
    rating: 4.8,
    reviewsCount: 31
  },
  {
    _id: "d7",
    customId: "d7",
    name: "Dr. Farhan Kabir",
    specialty: "Oncologist",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    experience: "14 years",
    availability: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
    description: "Specialist in diagnosing and treating various cancers with the latest chemotherapy and immunotherapy protocols.",
    hospital: "BIRDEM General Hospital",
    location: "Shahbag, Dhaka",
    fee: 1500,
    rating: 4.8,
    reviewsCount: 22
  },
  {
    _id: "d8",
    customId: "d8",
    name: "Dr. Rezwana Islam",
    specialty: "Gynecologist",
    image: "https://randomuser.me/api/portraits/women/56.jpg",
    experience: "11 years",
    availability: ["08:30 AM - 12:30 PM", "02:00 PM - 05:00 PM"],
    description: "Experienced gynecologist focused on maternal healthcare, high-risk pregnancies, and women's reproductive wellness.",
    hospital: "Anwer Khan Modern Hospital",
    location: "Dhanmondi, Dhaka",
    fee: 900,
    rating: 4.9,
    reviewsCount: 57
  },
  {
    _id: "d9",
    customId: "d9",
    name: "Dr. Imtiaz Ahmed",
    specialty: "Gastroenterologist",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    experience: "13 years",
    availability: ["11:00 AM - 02:00 PM", "05:00 PM - 08:00 PM"],
    description: "Expert in digestive health, treating conditions like IBS, liver disease, GERD, and complex bowel disorders.",
    hospital: "Dhaka Medical College Hospital",
    location: "Bakshibazar, Dhaka",
    fee: 850,
    rating: 4.7,
    reviewsCount: 33
  },
  {
    _id: "d10",
    customId: "d10",
    name: "Dr. Samira Akter",
    specialty: "Ophthalmologist",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    experience: "6 years",
    availability: ["09:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"],
    description: "Specialized eye care physician providing cataract surgery, LASIK consultation, and pediatric eye treatments.",
    hospital: "National Institute of Ophthalmology",
    location: "Agargaon, Dhaka",
    fee: 600,
    rating: 4.8,
    reviewsCount: 45
  },
  {
    _id: "d11",
    customId: "d11",
    name: "Dr. Zahidul Karim",
    specialty: "Psychiatrist",
    image: "https://randomuser.me/api/portraits/men/90.jpg",
    experience: "10 years",
    availability: ["10:00 AM - 01:00 PM", "04:00 PM - 06:00 PM"],
    description: "Mental health specialist offering evidence-based therapy for anxiety, depression, PTSD, and mood disorders.",
    hospital: "National Institute of Mental Health",
    location: "Sher-e-Bangla Nagar, Dhaka",
    fee: 750,
    rating: 4.7,
    reviewsCount: 19
  },
  {
    _id: "d12",
    customId: "d12",
    name: "Dr. Tasnia Begum",
    specialty: "Endocrinologist",
    image: "https://randomuser.me/api/portraits/women/61.jpg",
    experience: "8 years",
    availability: ["09:00 AM - 12:00 PM", "03:00 PM - 06:00 PM"],
    description: "Hormone health specialist managing diabetes, thyroid disorders, adrenal conditions, and metabolic diseases.",
    hospital: "BSMMU Hospital",
    location: "Shahbag, Dhaka",
    fee: 700,
    rating: 4.8,
    reviewsCount: 26
  }
];

let users = [
  {
    _id: "u1",
    name: "Rahim Uddin",
    email: "user@gmail.com",
    passwordHash: bcrypt.hashSync("User123!", 10),
    photoUrl: "https://randomuser.me/api/portraits/men/11.jpg",
    role: "patient"
  }
];

let appointments = [
  {
    _id: "app1",
    userEmail: "user@gmail.com",
    doctorId: "d1",
    doctorName: "Dr. Ayesha Rahman",
    doctorSpecialty: "Cardiologist",
    patientName: "Rahim Uddin",
    gender: "Male",
    phone: "01712345678",
    appointmentDate: "2026-05-12",
    appointmentTime: "10:30 AM",
    fee: 800,
    status: "Confirmed",
    createdAt: new Date().toISOString()
  }
];

let reviews = [
  {
    _id: "r1",
    doctorId: "d1",
    userEmail: "user@gmail.com",
    userName: "Rahim Uddin",
    userPhoto: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 5,
    comment: "Dr. Ayesha Rahman is incredibly knowledgeable and kind. She carefully explained my diagnosis and reassured me throughout the consultation.",
    createdAt: new Date().toISOString()
  },
  {
    _id: "r2",
    doctorId: "d3",
    userEmail: "user@gmail.com",
    userName: "Rahim Uddin",
    userPhoto: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 5,
    comment: "Dr. Nusrat Jahan is fantastic with children. My son was completely at ease during the checkup. Highly recommended!",
    createdAt: new Date().toISOString()
  }
];

module.exports = {
  doctors,
  users,
  appointments,
  reviews
};
