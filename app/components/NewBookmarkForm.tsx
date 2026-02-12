"use client";

import { addBookmark } from "@/app/actions";

const NewBookmark = () => {
  return (
    <form className="flex w-full max-w-xl mx-auto" action={addBookmark}>
      <input
        name="bookmark"
        className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter a URL to bookmark"
      />
      <button
        type="submit"
        className="px-6 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add
      </button>
    </form>
  );
};

export default NewBookmark;
