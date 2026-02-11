export function buildAddAdsFormData (
    {
        nameEn,
        nameAr,
        category,
        categoryId,
        image,
        isActive,
        descriptionEn,
        descriptionAr,
        activeFrom,
        activeUntil
    }
) {
    const formData = new FormData();
    formData.append('name_en', nameEn);
    formData.append('name_ar', nameAr);
    formData.append('category', category);
    formData.append('category_id', categoryId);
    formData.append('image', image);
    formData.append('is_active', isActive);
    formData.append('description_en', descriptionEn);
    formData.append('description_ar', descriptionAr);
    formData.append('active_from', activeFrom);
    formData.append('active_until', activeUntil);

    return formData;
}