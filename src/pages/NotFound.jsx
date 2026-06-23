import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page text-center max-w-xl mx-auto">
        <div className="text-7xl md:text-8xl font-display font-bold text-gradient">404</div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mt-4">
          Page not found
        </h1>
        <p className="text-slate-600 mt-3">
          The page you are looking for might have been moved, renamed, or doesn't exist.
        </p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    </section>
  );
}
