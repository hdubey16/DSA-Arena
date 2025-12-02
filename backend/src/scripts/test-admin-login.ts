import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const testAdminLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('✅ Connected to MongoDB');

    const email = 'admin@dsa.com';
    const password = 'himumu';

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found');
      await mongoose.disconnect();
      return;
    }

    console.log('✅ User found:', {
      email: user.email,
      role: user.role,
      status: user.status
    });

    const isMatch = await user.comparePassword(password);
    console.log('\n🔑 Password test:', isMatch ? '✅ CORRECT' : '❌ INCORRECT');
    
    if (!isMatch) {
      console.log('\n🔧 Fixing password...');
      user.password = password; // This will trigger the pre-save hook to hash it
      await user.save();
      console.log('✅ Password updated and hashed');
      
      // Test again
      const updatedUser = await User.findOne({ email });
      const isMatchNow = await updatedUser!.comparePassword(password);
      console.log('🔑 Password test after update:', isMatchNow ? '✅ CORRECT' : '❌ INCORRECT');
    }

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

testAdminLogin();
