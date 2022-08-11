import React, { Component, createContext } from 'react'

const createEmptySlots = (TOTAL_SPACES: number) => {
    const cardata = Array(TOTAL_SPACES)
        .fill(0)
        .map((_, index) =>
            Object({
                carnumber: "",
                bookingid: index,
                available: true,
                cartiming: "",
            })
        );
    return cardata;
};

export interface Slot {
    carnumber: string;
    bookingid: number;
    available: boolean;
    cartiming: string | Date;
}
// 
export interface SlotContextType {
    freeSlots: number;
    boxes: Slot[];
    car_num: any
    bookSlot: (carNumber: string, time: Date) => void;
    removeFromSlot: (bookingid: number) => void;
    createSlots: (slot: number) => void;
    arrival_time: any;
}

export const CardContext = createContext<SlotContextType>({
    freeSlots: 0,
    boxes: createEmptySlots(0),
    bookSlot: (carRc: string, datetime: Date) => { },
    removeFromSlot: (bookingid: number) => { },
    createSlots: (slot: number) => { },
    car_num: "",
    arrival_time: "",
});

export default class CardContextProvider extends Component<any, any> {
    state = {
        RcValue: "",
        date: (new Date()),
        boxes: createEmptySlots(0),
        freeSlots: 0
    }

    // Return total free spaces

    countFreeSlots = () => {
        const freeSlots = this.state.boxes.filter(slot => slot.available).length;

        this.setState({ freeSlots: freeSlots });
        return freeSlots;
    };


    // return a random free slots Id
    getRandomId = () => Math.floor(Math.random() * this.countFreeSlots());

    // return free slot Id
    getFreeSpaceId = () => {
        const freeSpace = this.state.boxes.filter(
            (val) => val.available === true
        );
        return freeSpace[this.getRandomId()].bookingid;
    }



    createSlots = (slot: number) => {
        const newBoxes = createEmptySlots(slot);
        this.setState({ boxes: newBoxes });
        this.setState({ freeSlots: slot });
    }


    bookSlot = async (carRc: string, datetime: Date) => {

        if (this.state.freeSlots === 0) {
            return;
        }

        let carDetails = {
            carnumber: carRc,
            bookingid: this.getFreeSpaceId(),
            available: false,
            cartiming: datetime,
        };
        const box = [...this.state.boxes];
        box[carDetails.bookingid] = carDetails;
        this.setState({ boxes: box }, async () => {
            const slot = this.countFreeSlots();
            this.setState({ freeSlots: slot })
        });
    }

    removeFromSlot = (bookingid: number) => {
        const newSlots = [...this.state.boxes];
        const slot = newSlots[bookingid];
        slot.available = true;
        slot.carnumber = "";
        slot.cartiming = "";
        this.setState({ boxes: newSlots }, async () => {
            const slot = this.countFreeSlots();
            this.setState({ freeSlots: slot })
        });
    }

    render = () => (
            <CardContext.Provider
                value=
                {{
                    createSlots: this.createSlots,
                    bookSlot: this.bookSlot,
                    boxes: this.state.boxes,
                    car_num: this.state.RcValue,
                    arrival_time: this.state.date,
                    freeSlots: this.state.freeSlots,
                    removeFromSlot: this.removeFromSlot,

                }}
            >
                {this.props.children}
            </CardContext.Provider>
        )
}

