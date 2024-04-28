// Helper function to return the response's result text if successful, otherwise
// returns the rejected Promise result with an error status and corresponding text
const statusCheck = async (res) => {
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res;
}

const getPageDetails = async (fileName) => {
  try {
    let res = await fetch(`routes/${fileName}`);
    await statusCheck(res);
    let details = await res.json();
    console.log(details);
    return details;
  } catch (err) {
    console.log(err);
  }
}

export default getPageDetails