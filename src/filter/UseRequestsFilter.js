import { useState } from "react";

export function useRequestsFilter() {
    const [status, setStatus] = useState(['pending', 'accepted', 'rejected']);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [value, setValue] = useState(null);
    const [teacherId, setTeacherId] = useState('');

    return {
        status, setStatus, from, setFrom, to, setTo, value, setValue, teacherId, setTeacherId,
    };
}