function formatDate(date) {
    const year = date.getFullYear();
    // Months are zero-based, so we add 1 to get the correct month
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

module.exports = formatDate;