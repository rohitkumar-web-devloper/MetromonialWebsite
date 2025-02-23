export const formatText = (text) => {
    // Convert first letter of each word to uppercase
    return text
        .split('-') // Split by hyphen
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' '); // Join with space
}