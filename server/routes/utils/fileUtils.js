import { promises as fs } from 'fs';

// access json file and retrieve information
export async function getJSONFile(fileName){
    let data = await fs.readFile(fileName, 'utf8');
    let obj = JSON.parse(data);
    return obj;
}

// update information in a specified json file
export async function updateJSONFile(fileName, updateData){
  let data = await getJSONFile(`./assets/${fileName}.json`);

  let section = updateData.section;
  let changePart = updateData.part;
  let val = updateData.value;

  if(section === fileName) {
    data[changePart] = val;
  } else if (data.subsections.section) {
    data.subsections.section.changePart = val;
  } else {
    return {}
  }

  await fs.writeFile(fileName, JSON.stringify(data));
  return data
}