import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Submission from '../models/Submission';
import UserProgress from '../models/UserProgress';

dotenv.config();

const deleteKritika = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');

    // Find the user
    const user = await User.findOne({ email: 'kritika@java.com' });
    
    if (!user) {
      console.log('⚠️  User kritika@java.com not found');
      process.exit(0);
    }

    const userId = user._id.toString();
    console.log(`Found user: ${user.name} (${user.email}) - ID: ${userId}`);

    // Delete user's submissions
    const submissionsDeleted = await Submission.deleteMany({ userId });
    console.log(`🗑️  Deleted ${submissionsDeleted.deletedCount} submissions`);

    // Delete user's progress
    const progressDeleted = await UserProgress.deleteMany({ userId });
    console.log(`🗑️  Deleted ${progressDeleted.deletedCount} progress records`);

    // Delete the user
    await User.deleteOne({ _id: user._id });
    console.log(`✅ Deleted user: ${user.name} (${user.email})`);

    console.log('\n✅ Kritika deletion completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    process.exit(1);
  }
};

deleteKritika();
