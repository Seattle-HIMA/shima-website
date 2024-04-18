import { promises as fs } from 'fs';

// access json file and retrieve information
export async function getJSONFile(fileName){
    let data = await fs.readFile(fileName, 'utf8');
    let obj = JSON.parse(data);
    return obj;
}

// update information in a specified json file
export async function updateJSONFile(fileName, updateData){
  let data = await getJSONFile(fileName);
  let key = updateData.title;
  let value = updateData.value;
  data[key] = value;
  await fs.writeFile(fileName, JSON.stringify(data));
  return data
}