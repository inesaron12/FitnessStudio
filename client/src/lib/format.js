/**
 * Formats a raw price value into a localized currency string.
 * @param {number|string} price - The price value to format.
 * @returns {string} The formatted currency string.
 */
export function formatPrice(price) {
    // Convert to float if the price is passed as a string from the API
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price

    // Note: If your database stores prices in cents (e.g., 2999 for $29.99), 
    // uncomment the line below:
    // const numericPrice = price / 100

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // Change to 'EUR' if your studio uses Euros
    }).format(numericPrice || 0)
}