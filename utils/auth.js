import { log } from 'console';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import { logger } from './logger.js';
/**
 * Generate Password
 */
const generatePassword = (length = 6) => {
  let text = '';
  let possible = process.env.POSSIBLE_PASSWORDS || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

/**
 * Encrypt the password using crypto module
 */
const encryptPassword = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
};

/**
 * Compare the password using crypto module
 */
const comparePassword = (password, hash, salt) => {
  const passwordHash = encryptPassword(password, salt);
  return passwordHash === hash;
};

/**
 * Generates Salt for the password
 */

const generateSalt = () => {
  return crypto.randomBytes(16).toString('hex');
};

/**
 * Generate JWT token
 */
const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';
  return jwt.sign(payload, secretKey, { expiresIn: '12h' });
};

const sendEmail = async (email, subject, text) => {
  try {
    // console.log(email, subject,"check12", text);
      const transporter = await nodemailer.createTransport({
          host: 'smtp.zoho.com',
         // host: process.env.host,
          // service: 'gmail',
          port: 465,
          secure: true,
          // requireTLS:true,
          auth: {
              user: 'ajay.meena@graffersid.com',  
               pass: 'Ajay@3210'
          },
      });
  
       transporter.sendMail({
          to: email,
          from: 'ajay@graffersid.com',
          subject: ":Mail Test",
          text: "testing 1232434235424353456",
      },
      (error, info) => {
        console.log("error-----------------------------", error);
        if (error) {
          logger.error(error, { service: "mail-util" });
        }
        else {
          logger.info(info.response, { service: "mail-util" });
        }
      }
    );
  } catch (error) {
    logger.error(error, { service: "mail-util" });
     throw new Error(error.message)
  }
};

export { generatePassword, encryptPassword, comparePassword, generateSalt, generateToken, sendEmail};
