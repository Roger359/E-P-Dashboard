import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { Home, BookOpen, BarChart3 } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: 'Dashboard Petrolero Global',
  description: 'Análisis interactivo de producción, reservas y economía petrolera de 50 países',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Dashboard Petrolero Global',
    description: 'Análisis interactivo de producción, reservas y economía petrolera de 50 países',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Mobile Top Navigation */}
          <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-50">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">E&P Dashboard</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link 
                  href="/" 
                  className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Home className="w-5 h-5" />
                </Link>
                <Link 
                  href="/documentacion" 
                  className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <BookOpen className="w-5 h-5" />
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-r border-slate-200 dark:border-slate-700 z-50">
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-[#52ab32] dark:text-amber-400" />
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">CPVEN E&P</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Análisis Global</p>
                  </div>
                </div>
                <ThemeToggle />
              </div>

              <nav className="space-y-2">
                <Link 
                  href="/" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#52ab32] dark:hover:text-[#52ab32] transition-colors group"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Dashboard Principal</span>
                </Link>
                <Link 
                  href="/documentacion" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-500 dark:hover:text-amber-400 transition-colors group"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Documentación</span>
                </Link>
              </nav>

              <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Sobre este dashboard</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Datos de 50 países productores de petróleo con gráficos interactivos y filtros avanzados.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-16 lg:pt-0 lg:ml-64 bg-slate-50 dark:bg-slate-950 min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
