import React, { useState } from 'react'

function MyForm() {
  const[fullName,setFullName]=useState("")
  const[errors,setErrors]=useState({})

  
  function handleName(e) {
  let value = e.target.value;
  setFullName(value);

  if (value.trim().length < 10) {
    setErrors({
      ...errors,
      fullName: "Please enter at least 10 characters"
    });
  } else {
    setErrors({
      ...errors,
      fullName: ""
    });
  }
}
  

   
  
  
  return (
    <div>

<form className="px-4 mt-6">
  <div className="space-y-6 max-w-md mx-auto">
    <div className="flex items-start gap-2">
      <label
        htmlFor="name"
        className="w-32 shrink-0 pt-3 text-slate-900 dark:text-slate-50 font-medium text-sm"
      >
        Name
      </label>

      <div className="flex-1 min-w-0">
        <input
          value={fullName}
          onChange={handleName}
          type="text"
          id="name"
          name="name"
          placeholder="John Smith"
          required
          className="w-full px-1 py-2.5 text-sm text-slate-900 dark:text-slate-50 bg-white dark:bg-neutral-800 border-b-2 border-slate-300 dark:border-neutral-700 focus:border-blue-600 outline-none"
        />

        {errors.fullName && (
          <span className="block mt-1 text-red-600 text-sm">
            {errors.fullName}
          </span>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2">
      <label
        htmlFor="email"
        className="w-32 shrink-0 text-slate-900 dark:text-slate-50 font-medium text-sm"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="john@readymadeui.com"
        required
        className="flex-1 min-w-0 px-1 py-2.5 text-sm text-slate-900 dark:text-slate-50 bg-white dark:bg-neutral-800 border-b-2 border-slate-300 dark:border-neutral-700 focus:border-blue-600 outline-none"
      />
    </div>

    {/* Phone */}
    <div className="flex items-center gap-2">
      <label
        htmlFor="phone"
        className="w-32 shrink-0 text-slate-900 dark:text-slate-50 font-medium text-sm"
      >
        Phone
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="+254 700 000000"
        required
        className="flex-1 min-w-0 px-1 py-2.5 text-sm text-slate-900 dark:text-slate-50 bg-white dark:bg-neutral-800 border-b-2 border-slate-300 dark:border-neutral-700 focus:border-blue-600 outline-none"
      />
    </div>

    {/* Address */}
    <div className="flex items-center gap-2">
      <label
        htmlFor="address"
        className="w-32 shrink-0 text-slate-900 dark:text-slate-50 font-medium text-sm"
      >
        Address
      </label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="123 Main Street, Mombasa"
        required
        className="flex-1 min-w-0 px-1 py-2.5 text-sm text-slate-900 dark:text-slate-50 bg-white dark:bg-neutral-800 border-b-2 border-slate-300 dark:border-neutral-700 focus:border-blue-600 outline-none"
      />
    </div>

    {/* Terms and conditions */}
    <div className="flex items-start">
      <label className="flex items-center group has-[input:checked]:text-slate-900">
        <input
          id="tmc"
          name="tmc"
          type="checkbox"
          required
          className="sr-only"
        />
        <span
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-700 bg-white dark:bg-neutral-800 group-has-[input:checked]:bg-blue-600 group-has-[input:checked]:outline-blue-600 group-focus-within:outline-2 group-focus-within:outline-blue-600"
          aria-hidden="true"
        >
          <svg
            className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100"
            viewBox="0 0 12 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M1 5l3 3 7-7" />
          </svg>
        </span>
        <span className="ml-3 text-sm text-slate-600 dark:text-slate-50">
          I accept the
        </span>
      </label>

      <a
        href="#"
        className="ml-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline"
      >
        Terms and Conditions
      </a>
    </div>

    {/* Submit button */}
    <button
      type="submit"
      className="!mt-2 py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all"
    >
      Submit
    </button>

  </div>
</form>

    </div>
  )
}

export default MyForm