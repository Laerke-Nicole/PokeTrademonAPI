import axios from 'axios';

const secretKey = process.env.RECAPTCHA_SECRET_KEY;

export const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );
    const data = response.data;
    return data.success && data.score > 0.5; 
    
  } catch (err) {
    console.error('reCAPTCHA verification failed:', err);
    return false;
  }
};