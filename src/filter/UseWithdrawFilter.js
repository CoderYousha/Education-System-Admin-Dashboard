import { useState } from "react";

export function useWithdrawFilter () {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [teacherValue, setTeacherValue] = useState('');

    return {
        from, setFrom, to, setTo, teacherId, setTeacherId, teacherValue, setTeacherValue
    };
}