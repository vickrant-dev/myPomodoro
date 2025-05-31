import "./globals.css";

export const metadata = {
    title: "My Pomodoro",
    description: "simple, yet powerful enough.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
