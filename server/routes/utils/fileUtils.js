import { promises as fs } from 'fs';

// access json file and retrieve information
export async function getJSONFile(fileName) {
    try {
        let data = await fs.readFile(fileName, 'utf8');
        let obj = JSON.parse(data);
        return obj;
    } catch (err) {
        if (err.code === "ENOENT") {
            res.status(500).send("file does not exist");
        } else {
            res.status(500).send({message: err.message});
        }
    }
}

// update information in a specified json file
export async function updateJSONFile(fileName, updateData) {
    try {
        let data = await getJSONFile(fileName);
        let key = updateData.title;
        let value = updateData.value;
        data[key] = value;
        await fs.writeFile(fileName, JSON.stringify(data));
        return "The information has been updated successfully"
    } catch (err) {
        if (err.code === "ENOENT") {
            res.status(500).send("file does not exist");
        } else {
            res.status(500).send({message: err.message});
        }
    }
}