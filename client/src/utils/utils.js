// Helper function to return the response's result text if successful, otherwise
// returns the rejected Promise result with an error status and corresponding text
export const statusCheck = async (res) => {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}

export const getPageDetails = async (fileName) => {
    try {
        let res = await fetch(`routes/${fileName}`);
        await statusCheck(res);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}
