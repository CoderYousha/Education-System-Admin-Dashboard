import { useState } from "react";

export function useWallet(){
    const [amount, setAmount] = useState('');

    return {
        amount, setAmount
    };
}