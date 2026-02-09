import { useState } from "react";

export function useStudentsFilter() {
    const [majorId, setMajorId] = useState('');
    const [value, setValue] = useState({ value: '', label: 'الكل' });
    const [fromCount, setFromCount] = useState('');
    const [toCount, setToCount] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    return  {
        majorId, setMajorId, value, setValue, fromCount, setFromCount, toCount, setToCount, fromDate, setFromDate, toDate, setToDate
    };
}