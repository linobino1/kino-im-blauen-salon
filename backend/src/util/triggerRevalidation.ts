import { CollectionAfterChangeHook } from 'payload/types';

/** return a CollectionAfterChangeHook that calls the frontend to revalidate this item */
export const addTriggerRevalidation = (endpoint: string, idField: string):CollectionAfterChangeHook => (
  async ({ doc }) => {
    let url = (`${process.env.FRONTEND_HOST}/api/revalidate/${endpoint}?secret=${process.env.REVALIDATION_SECRET}`)
    if (idField) {
      // e.g. "&slug=new-post"
      url += `&${idField}=${doc[idField]}`;
    }
    try {
      await fetch(url)
    } catch (err) {
      console.log(`revalidation hook '${url}' failed`);
      console.log(err);
    }
  }
);