import {db} from '../config/db.js';

export const getAllApplications = async () => {
    return await db('applications').select('name');
  };
  
  export const addNewApplication = async (name) => {
    return await db('applications').insert({ name });
  };
  
  export const getApplicationByName = async (name) => {
    return await db('applications').where({ name }).first();
  };
  
  export const getTranslationsByAppId = async (applicationId) => {
    return await db('translations').where({ application_id: applicationId });
  };
  
  export const addTranslationKey = async (applicationId, key, value) => {
    return await db('translations').insert({ key, value, application_id: applicationId });
  };