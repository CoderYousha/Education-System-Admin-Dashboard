export function buildAddTeacherFormData({
    firstName,
    lastName,
    specialization,
    academicDegree,
    experienceYears,
    birthDate,
    email,
    phoneNumber,
    code,
    major,
    password,
    confirmPassword,
}) {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('specialization_id', specialization);
    formData.append('academic_degree_id', academicDegree);
    formData.append('experience_years', experienceYears);
    formData.append('birth_date', birthDate);
    formData.append('email', email);
    formData.append('phone', phoneNumber);
    formData.append('phone_code', code);
    formData.append('major_id', major);
    formData.append('password', password);
    formData.append('password_confirmation', confirmPassword);
    formData.append('account_role', 'teacher');

    return formData;
}