import { promises as fs } from 'fs';

// access json file and retrieve information
export async function getJSONFile(fileName){
    let data = await fs.readFile(fileName, 'utf8');
    let obj = JSON.parse(data);
    return obj;
}

// update information in a specified json file
export async function updateJSONFile(fileName, updateData) {
  try {
    let data = await getJSONFile(`./assets/${fileName}.json`);

    let section = updateData.section;
    let changePart = updateData.part;
    let val = updateData.updatedInfo;

    if (section === fileName) {
      data[changePart] = val;
    } else if (data.subsections[section]) {
      if (data.subsections[section][changePart]) {
        data.subsections[section][changePart] = val;
      } else {
        return { error: `The part ${changePart} does not exist under ${section}` };
      }
    } else {
      return { error: `The section ${section} does not exist` };
    }

    await fs.writeFile(`./assets/${fileName}.json`, JSON.stringify(data));
    return data;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { error: 'File does not exist' };
    } else {
      return { error: err.message };
    }
  }
}