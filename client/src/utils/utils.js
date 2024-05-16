// Helper function to return the response's result text if successful, otherwise
// returns the rejected Promise result with an error status and corresponding text
export const statusCheck = async (res) => {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}

// get back the page info
export const getPageDetails = async (fileName) => {
    try {
        let res = await fetch(`routes/${fileName}`);
        await statusCheck(res);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

export const checkMembership = async (email) => {
    try {
      //check if member
      let res = await fetch("routes/users/get-membership-type", {
        method: "POST",
        body: JSON.stringify({
            email: email}),
        headers: {
            "Content-Type": "application/json"
        }
      });
      await statusCheck(res);
      let membership = await res.json();

      return membership.membership;
    } catch(err) {
      console.error(err);
    }
}

export const getProductsId = async () => {
    try {
        let res = await fetch("routes/payment/get-product-id");
        await statusCheck(res);
        let priceId = await res.json();
        return priceId;
    } catch (err) {
        console.log(err);
    }
}
