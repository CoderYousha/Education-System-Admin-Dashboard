import { useState } from "react";

export function useAddTeacher () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [academicDegree, setAcademicDegree] = useState('');
    const [experienceYears, setExperienceYears] = useState('');
    const [birthdate, setBirthDate] = useState('2025-01-01');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [major, setMajor] = useState('');

    return {firstName, setFirstName, lastName, setLastName, specialization, setSpecialization, academicDegree, setAcademicDegree,
            experienceYears, setExperienceYears, birthdate, setBirthDate, email, setEmail, phoneNumber, setPhoneNumber, code, setCode,
            password, setPassword, confirmPassword, setConfirmPassword, major, setMajor
    };
}