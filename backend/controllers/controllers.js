import xlsx from 'xlsx';
import fs from 'fs-extra';
import {
  getAllApplications,
  addNewApplication,
  getApplicationByName,
  getTranslationsByAppId,
  addTranslationKey
} from '../models/models.js';

export const getApplications = async (req, res) => {

  try {
    const applications = await getAllApplications();
    res.json(applications.map(app => app.name));
  } 
  catch (error) {
    res.status(500).send('Error fetching applications');
  }
};

export const addApplication = async (req, res) => {

  const { name } = req.body;

  try {
    await addNewApplication(name);
    res.status(201).send('Application added');
  } 
  catch (error) {
    res.status(400).send('Error adding application');
  }
};

export const downloadTranslations = async (req, res) => {

  const { appName } = req.params;
  console.log(req.params);

  try {
    const application = await getApplicationByName(appName);
    if (!application) {
      return res.status(404).send('Application not found');
    }
    const translations = await getTranslationsByAppId(application.id);
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(translations.map(({ key, value }) => ({ key, value })));
    xlsx.utils.book_append_sheet(wb, ws, 'Translations');
    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', `attachment; filename=${appName}_translations.xlsx`);
    res.send(buffer);
  }
   catch (error) {
    res.status(500).send('Error downloading translations');
  }
};

export const deployTranslations = async (req, res) => {

  
  const { appName } = req.params;
  console.log(req.params);

  try {
    const application = await getApplicationByName(appName);
    if (!application) {
      return res.status(404).send('Application not found');
    }

    const translations = await getTranslationsByAppId(application.id);
    await fs.outputJson(`./translations/${appName}.json`, translations.map(({ key, value }) => ({ key, value })));
    res.send('Translations deployed');
  } 
  catch (error) {
    res.status(500).send('Error deploying translations');
  }
};

export const _addTranslationKey = async (req, res) => {

  const { appName } = req.params;
  const { key, value } = req.body;
  
  try {
    const application = await getApplicationByName(appName);
    if (!application) {
      return res.status(404).send('Application not found');
    }
    await addTranslationKey(application.id, key, value);
    res.send('Translation key added');
  } 
  catch (error) {
    res.status(500).send('Error adding translation key');
  }
};
