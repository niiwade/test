import { Button } from "~/components/ui/button";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const handleLogout = () => {
    console.log("Logout clicked");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="https://bashtech.solutions/assets/logo-2163af80.svg"
                alt="Bashtech Logo"
                className="h-8 w-auto"
              />
              <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                Todo App
              </span>
            </div>

            {/* Navigation Items */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="/todos"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                Todos
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Profile clicked");
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                Profile
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Settings clicked");
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                Settings
              </a>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                user@example.com
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}