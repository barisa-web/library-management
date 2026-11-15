
import React, { useState, useEffect } from 'react'

function Settings() {

    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch settings from JSON Server
    useEffect(function () {

        fetch("http://localhost:3000/settings")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Failed to fetch settings");
                }
                return response.json();
            })
            .then(function (data) {
                setSettings(data[0]);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setMessage("Unable to load settings.");
                setLoading(false);
            });

    }, []);

    // Handle input changes
    function handleChange(e) {

        const { name, value } = e.target;

        setSettings({
            ...settings,
            [name]: value
        });
    }

    // Save updated settings
    function handleSubmit(e) {

        e.preventDefault();

        setSaving(true);
        setMessage("");

        const updatedSettings = {
            ...settings,
            maxBooks: Number(settings.maxBooks),
            borrowingDays: Number(settings.borrowingDays),
            finePerDay: Number(settings.finePerDay)
        };

        fetch(`http://localhost:3000/settings/${settings.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedSettings)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Failed to update settings");
                }
                return response.json();
            })
            .then(function (data) {
                setSettings(data);
                setMessage("Settings updated successfully!");
                setSaving(false);
            })
            .catch(function (error) {
                console.log(error);
                setMessage("Something went wrong. Please try again.");
                setSaving(false);
            });
    }

    if (loading) {
        return <p className="text-center p-6">Loading settings...</p>;
    }

    if (!settings) {
        return <p className="text-center p-6 text-red-500">
            Settings could not be loaded.
        </p>;
    }

    return (

        <div className="min-h-screen bg-slate-100 p-6">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-extrabold text-slate-900 mb-2 border-l-4 border-yellow-500 pl-4">
                    Library Settings
                </h1>

                <p className="text-slate-500 mb-8">
                    Manage your library information and system preferences.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Library Information */}
                    <div className="bg-white p-6 rounded-xl shadow-md">

                        <h2 className="text-xl font-bold text-slate-800 mb-5">
                            Library Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Library Name
                                </label>

                                <input
                                    type="text"
                                    name="libraryName"
                                    value={settings.libraryName}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Library Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={settings.email}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={settings.phone}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Library Address
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    value={settings.address}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>

                        </div>

                    </div>

                    {/* Borrowing Rules */}
                    <div className="bg-white p-6 rounded-xl shadow-md">

                        <h2 className="text-xl font-bold text-slate-800 mb-5">
                            Borrowing Rules
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Maximum Books Per Member
                                </label>

                                <input
                                    type="number"
                                    name="maxBooks"
                                    min="1"
                                    value={settings.maxBooks}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Borrowing Duration (Days)
                                </label>

                                <input
                                    type="number"
                                    name="borrowingDays"
                                    min="1"
                                    value={settings.borrowingDays}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                        </div>

                    </div>

                    {/* Fine Management */}
                    <div className="bg-white p-6 rounded-xl shadow-md">

                        <h2 className="text-xl font-bold text-slate-800 mb-5">
                            Fine Management
                        </h2>

                        <div>
                            <label className="block mb-2 font-semibold">
                                Fine Per Overdue Day (KSh)
                            </label>

                            <input
                                type="number"
                                name="finePerDay"
                                min="0"
                                value={settings.finePerDay}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>

                    </div>

                    {/* Opening Hours */}
                    <div className="bg-white p-6 rounded-xl shadow-md">

                        <h2 className="text-xl font-bold text-slate-800 mb-5">
                            Library Opening Hours
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Opening Time
                                </label>

                                <input
                                    type="time"
                                    name="openingTime"
                                    value={settings.openingTime}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Closing Time
                                </label>

                                <input
                                    type="time"
                                    name="closingTime"
                                    value={settings.closingTime}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                        </div>

                    </div>

                    {/* Administrator Information */}
                    <div className="bg-white p-6 rounded-xl shadow-md">

                        <h2 className="text-xl font-bold text-slate-800 mb-5">
                            Administrator Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Administrator Name
                                </label>

                                <input
                                    type="text"
                                    name="adminName"
                                    value={settings.adminName}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">
                                    Administrator Email
                                </label>

                                <input
                                    type="email"
                                    name="adminEmail"
                                    value={settings.adminEmail}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                        </div>

                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">

                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Settings"}
                        </button>

                    </div>

                    {message && (
                        <p className="text-center font-semibold text-green-600">
                            {message}
                        </p>
                    )}

                </form>

            </div>

        </div>
    )
}

export default Settings
