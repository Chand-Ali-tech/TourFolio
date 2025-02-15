export function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", { 
        day: "numeric", 
        month: "long", 
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: true 
    });
}
