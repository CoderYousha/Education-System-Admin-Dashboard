import { useState } from "react";
import { FormattedMessage } from "react-intl";

export function useTeachersFilter() {
    const [majorId, setMajorId] = useState('');
    const [majorsValue, setMajorsValue] = useState({ value: '', label: <FormattedMessage id='all' /> });
    const [teacherSpecializations, setTeacherSpecializations] = useState('');
    const [teacherSpecializationsValue, setTeacherSpecializationsValue] = useState({ value: '', label: <FormattedMessage id='all' /> });
    const [academicDegree, setAcademicDegree] = useState('');
    const [academicDegreeValue, setAcademicDegreeValue] = useState({ value: '', label: <FormattedMessage id='all' /> });

    return {
        majorId, setMajorId, majorsValue, setMajorsValue, teacherSpecializations, setTeacherSpecializations, 
        teacherSpecializationsValue, setTeacherSpecializationsValue, academicDegree, setAcademicDegree, academicDegreeValue,
        setAcademicDegreeValue
    };
}