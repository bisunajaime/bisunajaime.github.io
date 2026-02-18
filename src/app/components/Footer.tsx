export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 mb-4">
          © {new Date().getFullYear()} Jaime Bisuna. All rights reserved.
        </p>
        <p className="text-sm text-gray-500">
          Built with React, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
