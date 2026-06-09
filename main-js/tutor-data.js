const TUTOR_STORAGE_KEY = "skolarTutors";

const defaultTutors = [
    {
        id: "tutor-1",
        name: "Vannesa L. Cainong",
        age: "24 years old",
        education: "BEED Major in General Education",
        email: "vannesacainong18@gmail.com",
        contact: "09692617638",
        location: "Vannesa Cainong",
        rate: "₱350/hr",
        avatar: "../assets/img/tutor-avatar.png",
        bio: "Hello! My name is Vannesa L. Cainong, and I am a passionate independent tutor specializing in Reading, Writing, English, Math, Filipino, and Early Learning Skills for preschool and elementary students. I graduated with a Bachelor in Elementary Education, Major in General Education, and I am dedicated to creating a positive and supportive learning environment for every student.",
        rating: 5,
        completedLessons: 23,
        availability: {
            days: "Monday - Friday",
            time: "Flexible Hours",
            availableDates: [
                "2026-01-08",
                "2026-01-09",
                "2026-01-12",
                "2026-01-23"
            ]
        },
        subjects: [
            { name: "Early Learning Skills (preschool)", price: "₱350/hr" },
            { name: "English", price: "₱350/hr" },
            { name: "Filipino", price: "₱350/hr" },
            { name: "Math", price: "₱350/hr" },
            { name: "Reading", price: "₱350/hr" },
            { name: "Writing", price: "₱350/hr" }
        ],
        reviews: [
            {
                user: "User 1",
                date: "March 21",
                rating: 5,
                comment: "Vannesa is very patient and explains lessons clearly."
            },
            {
                user: "User 3",
                date: "June 21",
                rating: 5,
                comment: "She makes learning easy and fun."
            },
            {
                user: "User 67",
                date: "May 21",
                rating: 5,
                comment: "Very approachable and supportive tutor."
            }
        ]
    }
];

function getTutorProfiles() {
    const savedTutors = JSON.parse(localStorage.getItem(TUTOR_STORAGE_KEY));

    if (savedTutors && savedTutors.length > 0) {
        return savedTutors;
    }

    localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(defaultTutors));
    return defaultTutors;
}

function saveTutorProfiles(tutors) {
    localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(tutors));
}

function getTutorById(id) {
    const tutors = getTutorProfiles();
    return tutors.find(tutor => tutor.id === id);
}

function saveSelectedTutor(tutor) {
    localStorage.setItem("selectedTutor", JSON.stringify(tutor));
}