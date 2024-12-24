import "./globals.css"
import Navigation from "./components/Navigation";


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className=''>
        <div className="h-dvh flex flex-col justify-between">
          <div className="p-4 flex justify-center items-center">
            {children}
          </div>
          <Navigation />
        </div>
      </body>
    </html>
  );
}
