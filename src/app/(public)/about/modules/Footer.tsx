export default function Footer() {
    return (
      <footer className="bg-black text-gray-400 py-12 px-6 text-center text-sm">
        <p>© {new Date().getFullYear()} Nike, Inc. All Rights Reserved.</p>
        <p className="mt-2">
          <a href="#" className="hover:text-white underline">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="#" className="hover:text-white underline">
            Terms of Use
          </a>
        </p>
      </footer>
    );
  }
  