import { useState } from "react";

export function useAdsFilter () {
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const [activeFrom, setActiveFrom] = useState('');
    const [activeUntil, setActiveUntil] = useState('');

    return {
        status, setStatus, category, setCategory, activeFrom, setActiveFrom, activeUntil, setActiveUntil,
    };
}