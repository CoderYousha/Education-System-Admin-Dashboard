import { useState } from "react";

export function useFinancialOperationsFilter () {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseValue, setCourseValue] = useState({ value: '', label: 'الكل' });
    const [pathId, setPathId] = useState('');
    const [pathValue, setPathValue] = useState({ value: '', label: 'الكل' });
    const [teacherId, setTeacherId] = useState('');
    const [teacherValue, setTeacherValue] = useState({ value: '', label: 'الكل' });

    return {
        from, setFrom, to, setTo, courseId, setCourseId, courseValue, setCourseValue, pathId, setPathId, pathValue, setPathValue,
        teacherId, setTeacherId, teacherValue, setTeacherValue,
    };
}