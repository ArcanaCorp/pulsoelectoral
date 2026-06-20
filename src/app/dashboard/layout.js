import Navbar from "@/components/Layout/Navbar";

export const metadata = {
    title: "Dashboard",
    description: "Panel principal con indicadores estratégicos, intención de voto y evolución electoral.",
    robots: {
        index: false,
        follow: false
    }
};
export default function DashboardLayout ({ children }) {
    return (
        <div className="w-screen flex">
            <main className="w m-auto flex flex-col gap-md p-md" style={{"--w": "80%"}}>
                {children}
            </main>
        </div>
    )
}