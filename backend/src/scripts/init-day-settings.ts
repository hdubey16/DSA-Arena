import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DaySettings from '../models/DaySettings';

dotenv.config();

const studyDays = [
  { day: 1, topic: "Java Setup and Introduction", week: 1 },
  { day: 2, topic: "Variables and Data Types", week: 1 },
  { day: 3, topic: "Operators", week: 1 },
  { day: 4, topic: "Input/Output", week: 1 },
  { day: 5, topic: "Control Flow (if-else)", week: 1 },
  { day: 6, topic: "Loops (for, while)", week: 1 },
  { day: 7, topic: "Break and Continue", week: 2 },
  { day: 8, topic: "Methods", week: 2 },
  { day: 9, topic: "Method Overloading", week: 2 },
  { day: 10, topic: "1D Arrays", week: 2 },
  { day: 11, topic: "2D Arrays", week: 2 },
  { day: 12, topic: "Strings", week: 2 },
  { day: 13, topic: "Classes and Objects", week: 3 },
  { day: 14, topic: "Constructors", week: 3 },
  { day: 15, topic: "Constructor Overloading", week: 3 },
  { day: 16, topic: "Inheritance", week: 3 },
  { day: 17, topic: "Super Keyword", week: 3 },
  { day: 18, topic: "Method Overriding", week: 3 },
  { day: 19, topic: "Polymorphism", week: 4 },
  { day: 20, topic: "Abstraction", week: 4 },
  { day: 21, topic: "Abstract Classes", week: 4 },
  { day: 22, topic: "Interfaces", week: 4 },
  { day: 23, topic: "Multiple Inheritance", week: 4 },
  { day: 24, topic: "Encapsulation", week: 4 },
  { day: 25, topic: "Exception Handling (try-catch)", week: 5 },
  { day: 26, topic: "Custom Exceptions", week: 5 },
  { day: 27, topic: "ArrayList", week: 5 },
  { day: 28, topic: "LinkedList", week: 5 },
  { day: 29, topic: "Stack", week: 5 },
  { day: 30, topic: "Queue", week: 5 },
  { day: 31, topic: "HashSet", week: 6 },
  { day: 32, topic: "HashMap", week: 6 },
  { day: 33, topic: "TreeMap", week: 6 },
  { day: 34, topic: "File Handling", week: 6 },
  { day: 35, topic: "Sorting (Collections)", week: 6 },
  { day: 36, topic: "Comparator and Comparable", week: 6 },
  { day: 37, topic: "Serialization", week: 7 },
  { day: 38, topic: "JDBC Basics", week: 7 },
  { day: 39, topic: "CRUD Operations", week: 7 }
];

async function initializeDaySettings() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing settings
    await DaySettings.deleteMany({});
    console.log('Cleared existing day settings');

    // Create default settings for all days
    const settings = studyDays.map(day => ({
      dayId: day.day,
      title: `Day ${day.day}`,
      topic: day.topic,
      week: day.week,
      isLocked: day.day > 16, // Days 1-16 unlocked by default
      questionsPerDay: 5,
      customSettings: {
        allowHints: true,
        allowReset: true,
        showSolutions: true
      }
    }));

    await DaySettings.insertMany(settings);
    console.log(`✅ Initialized ${settings.length} day settings`);
    console.log('📌 Days 1-16 are unlocked by default');
    console.log('🔒 Days 17-39 are locked by default');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing day settings:', error);
    process.exit(1);
  }
}

initializeDaySettings();
