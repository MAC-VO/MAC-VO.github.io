const SideBar = <aside className="hidden md:w-1/3 lg:w-1/4 py-4 md:block">
  <div className="sticky top-12 flex flex-col gap-2 p-2 border rounded-xl">

    <a href="" className="px-3 py-1 font-semibold hover:bg-indigo-50 rounded-md">
      Dashboard
    </a>

    <a href="" className="px-3 py-1 font-semibold opacity-90 hover:bg-indigo-50 rounded-md">
      Study Lists
    </a>

    <a href="" className="px-3 py-1 font-semibold opacity-90 hover:bg-indigo-50 rounded-md">
      Your contribution
    </a>

    <div className="inline-flex items-center pl-1">
      <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"></path>
      </svg>
      <a href="" className="py-1 font-semibold hover:bg-indigo-50 rounded-md">
        Recently viewed
      </a>
    </div>

    <a href="" className="px-3 py-1 font-semibold opacity-90 hover:bg-indigo-50 rounded-md">
      Settings
    </a>

    <button type="submit"
      className="text-red-500 text-sm font-semibold hover:text-purple-600 mb-1 border bg-white px-3 py-2 hover:bg-violet-200 rounded-md">
      Log Out
    </button>
  </div>
</aside>

export default SideBar;
