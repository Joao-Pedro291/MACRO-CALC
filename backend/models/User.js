import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String, // 'male' ou 'female'
  weight: Number,
  height: Number,
  activityLevel: String, // ex: 'sedentary', 'light', 'moderate', 'active', 'very active'
  goal: String, // 'gain', 'loss', 'maintenance'
  history: [
    {
      date: { type: Date, default: Date.now },
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number,
    }
  ],
});

const User = mongoose.model('User', userSchema);
export default User;
