import { useState } from "react";

export function useAddAds () {
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [category, setCategory] = useState('courses');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState('');
    const [isActive, setIsActive] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
    const [activeFrom, setActiveFrom] = useState('');
    const [activeUntil, setActiveUntil] = useState('');

    return {
        nameEn, setNameEn, nameAr, setNameAr, category, setCategory, categoryId, setCategoryId, image, setImage, isActive,
        setIsActive, descriptionEn, setDescriptionEn, descriptionAr, setDescriptionAr, activeFrom, setActiveFrom,
        activeUntil, setActiveUntil
    };
}