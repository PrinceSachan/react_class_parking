import { calculateAmount } from "./calculate";

export const makePayment = async (singleItem: any) => {
    let data = {
        "car-registration": singleItem.carnumber,
        charge: calculateAmount(singleItem),
    };

    try {
        const res = await fetch("https://httpstat.us/200", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.status === 200) {
            return true;
        } else {
            throw new Error("Payment Failed");
        }
    } catch (err: any) {
        return false;
    }
};