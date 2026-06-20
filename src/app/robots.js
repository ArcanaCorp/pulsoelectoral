export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/"
            }
        ],
        sitemap: "https://pulsoelectoral.pe/sitemap.xml"
    }
}