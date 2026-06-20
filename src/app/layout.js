import { Raleway } from "next/font/google";
import '@/assets/global.css';
import { Provider } from "@/providers/Provider";
import { Toaster } from "sonner";

const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata = {
    metadataBase: new URL("https://pulsoelectoral.pe"),
    title: {
        default: "Pulso Electoral",
        template: "%s | Pulso Electoral"
    },
    description: "Plataforma de inteligencia electoral para campañas municipales y provinciales. Encuestas, simulación de escenarios, segmentación territorial y análisis estratégico en tiempo real.",
    keywords: [
        "Pulso Electoral",
        "Inteligencia Electoral",
        "Encuestas Electorales",
        "Campañas Políticas",
        "Marketing Político",
        "Simulación Electoral",
        "Análisis Electoral",
        "Dashboard Electoral",
        "Elecciones Perú 2026",
        "Publicidad Política",
        "Segmentación Electoral",
        "Estrategia Territorial"
    ],
    authors: [
        {
            name: "Pulso Electoral",
            url: "https://pulsoelectoral.pe"
        }
    ],
    creator: "Pulso Electoral",
    publisher: "Pulso Electoral",
    category: "Política",
    classification: "Inteligencia Electoral",
    applicationName: "Pulso Electoral",
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    alternates: {
        canonical: "/"
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
        }
    },
    icons: {
        icon: [
            {
                url: "/favicon.ico"
            },
            {
                url: "/icon-32x32.png",
                sizes: "32x32",
                type: "image/png"
            },
            {
                url: "/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            }
        ],
        apple: [
            {
                url: "/apple-touch-icon.png",
                sizes: "180x180"
            }
        ]
    },
    manifest: "/manifest.json",
    openGraph: {
        type: "website",
        locale: "es_PE",
        url: "https://pulsoelectoral.pe",
        siteName: "Pulso Electoral",
        title: "Pulso Electoral | Inteligencia Electoral para Campañas",
        description: "Plataforma de inteligencia electoral con encuestas, simulación de escenarios, análisis territorial y estrategia política.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Pulso Electoral"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Pulso Electoral",
        description: "Inteligencia electoral para campañas municipales y provinciales.",
        images: ["/og-image.jpg"]
    },
    verification: {
        google: "TU_CODIGO_GOOGLE",
        yandex: "",
        yahoo: "",
        other: {}
    }
};

export default function RootLayout ({ children }) {
    return (
        <html lang="es" className={`${raleway.variable}`}>
            <body className="w-screen">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context":"https://schema.org",
                            "@type":"SoftwareApplication",
                            "name":"Pulso Electoral",
                            "applicationCategory":"BusinessApplication",
                            "operatingSystem":"Web",
                            "description":"Plataforma de inteligencia electoral para campañas políticas.",
                            "url":"https://pulsoelectoral.pe",
                            "image":"https://pulsoelectoral.pe/og-image.jpg",
                            "offers":{
                                "@type":"Offer",
                                "price":"0",
                                "priceCurrency":"PEN"
                            },
                            "publisher":{
                                "@type":"Organization",
                                "name":"Pulso Electoral"
                            }
                        })
                    }}
                />
                <Provider>
                    {children}
                </Provider>
                <Toaster position="top-center" closeButton duration={5000} />
            </body>
        </html>
    )
}