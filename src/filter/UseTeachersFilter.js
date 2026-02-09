import { useState } from "react";

export function useTeachersFilter() {
    const [majorId, setMajorId] = useState('');
    const [majorsValue, setMajorsValue] = useState({ value: '', label: 'الكل' });
    const [teacherSpecializations, setTeacherSpecializations] = useState('');
    const [teacherSpecializationsValue, setTeacherSpecializationsValue] = useState({ value: '', label: 'الكل' });
    const [academicDegree, setAcademicDegree] = useState('');
    const [academicDegreeValue, setAcademicDegreeValue] = useState({ value: '', label: 'الكل' });

    return {
        majorId, setMajorId, majorsValue, setMajorsValue, teacherSpecializations, setTeacherSpecializations, 
        teacherSpecializationsValue, setTeacherSpecializationsValue, academicDegree, setAcademicDegree, academicDegreeValue,
        setAcademicDegreeValue
    };
}