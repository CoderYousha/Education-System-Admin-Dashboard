export function buildWalletFormData({
        amount
}) {
    const formData = new FormData();
    formData.append('amount', amount);

    return formData;
}