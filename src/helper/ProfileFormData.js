export function buildProfileFormData({
     firstName,
     lastName,
     phoneCode,
     phoneNumber,
     birthDate,
     email,
     language,
     image
}) {
     const formData = new FormData();

     firstName && formData.append('first_name', firstName);
     lastName && formData.append('last_name', lastName);
     phoneCode && formData.append('phone_code', phoneCode);
     phoneNumber && formData.append('phone', phoneNumber);
     email && formData.append('email', email);
     birthDate && formData.append('birth_date', birthDate);
     language &&formData.append('language', language);
     image && formData.append('image', image);

     return formData;
}