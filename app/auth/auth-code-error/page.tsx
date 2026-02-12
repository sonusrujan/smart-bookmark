export default function AuthCodeError() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Authentication Error
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            There was an error during the authentication process. Please try again.
          </p>
        </div>
      </div>
    </div>
  );
}
