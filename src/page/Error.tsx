import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError() as Error & { digest?: string };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl text-center border border-gray-700">
        <XCircle className="mx-auto h-20 w-20 text-red-500" />
        <h1 className="mt-4 text-5xl font-extrabold text-red-400">Oops!</h1>
        <p className="mt-2 text-lg text-gray-300">Something went wrong while processing your request.</p>
        <p className="text-sm text-gray-400 mt-1">Error Code: {error.digest || "Unknown"}</p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-block rounded-lg bg-red-500 px-5 py-3 text-white font-semibold transition-all hover:bg-red-600 shadow-lg"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}
