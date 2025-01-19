const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const { client } = require('../config/config'); // เพิ่มการนำเข้า client สำหรับการตอบกลับข้อความ

dotenv.config();

// MySQL connection pooling configuration
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

// ฟังก์ชันสำหรับดึงข้อมูล intents และ training phrases จากฐานข้อมูล
async function getIntentsAndTrainingPhrasesFromDB() {
  try {
    const [intents] = await pool.query('SELECT intent_id, intent_name FROM intents');
    const [trainingPhrases] = await pool.query('SELECT intent_id, phrase FROM training_phrases');

    const intentsData = intents.map(intent => {
      return {
        intent_id: intent.intent_id,
        intent_name: intent.intent_name,
        training_phrases: trainingPhrases
          .filter(phrase => phrase.intent_id === intent.intent_id)
          .map(phrase => phrase.phrase),
      };
    });

    return intentsData;
  } catch (error) {
    console.error('Error fetching intents and training phrases from database:', error);
    throw new Error('Database query failed');
  }
}

// ฟังก์ชันสำหรับดึงข้อมูลจากตาราง flowchart
async function getflowchartFromDB() {
  try {
    const [flowchart] = await pool.query('SELECT * FROM flowchart;');
    return flowchart;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}

// ฟังก์ชันสำหรับดึงข้อมูลจากตาราง Pseudocode
async function getPseudocodeFromDB() {
  try {
    const [Pseudocode] = await pool.query('SELECT * FROM Pseudocode;');
    return Pseudocode;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}

// ฟังก์ชันสำหรับดึงข้อมูลจากตาราง Quiz
async function getQuizFromDB() {
  try {
    const [Quiz] = await pool.query('SELECT * FROM Quiz;');
    return Quiz;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}

async function getQuestionFromDB() {
  try {
    const [Question] = await pool.query('SELECT * FROM Question;');
    return Question;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}

async function getadminFromDB() {
  try {
    const [admin] = await pool.query('SELECT * FROM admin;');
    return admin;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}

module.exports = {
  getIntentsAndTrainingPhrasesFromDB,
  getflowchartFromDB,
  getPseudocodeFromDB,
  getQuizFromDB,
  getQuestionFromDB,
  getadminFromDB,
};
