// Fungsi ini hanya contoh sederhana. Anda perlu mengimplementasikan logika
// yang akurat berdasarkan referensi yang diberikan.
export function getZodiacSign(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    // ...tambahkan logika zodiak lainnya
    return "Unknown";
}

export function getHoroscopeSign(date: Date): string {
    // Implementasi logika horoskop di sini
    return "Aries"; // Contoh
}