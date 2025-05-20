// import axios from 'axios';

// export const verifyRecaptcha = async (token: string): Promise<boolean> => {
//   const secret = process.env.RECAPTCHA_SECRET_KEY;

//   const response = await axios.post(
//     `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
//   );

//   const data = response.data;
//   return data.success && data.score > 0.5; // adjust threshold if needed
// };