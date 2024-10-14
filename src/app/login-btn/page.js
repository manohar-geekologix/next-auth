"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="flex flex-col items-center justify-center p-6 h-screen  rounded  shadow-md text-white space-y-4">
                <p className="text-lg font-semibold">Signed in as <span className="text-blue-400">{session.user.email}</span></p>
                <p className="text-sm text-gray-400">Session Expires At: <span>{new Date(session.expires).toLocaleString()}</span></p>
                {session.user.image && (
                    <img className="w-16 h-16 rounded-full border-2 border-blue-400" src={session.user.image} alt="Profile Image" />
                )}
                <button
                    onClick={() => signOut()}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition duration-200 ease-in-out"
                >
                    Sign out
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 h-screen rounded shadow-md text-white space-y-4">
            <p className="text-lg font-semibold">Not signed in</p>
            <div className="flex space-x-4">
                <button
                    onClick={() => signIn("google", { prompt: "select_account" })}  // <-- Added prompt: "select_account"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition duration-200 ease-in-out"
                >
                    Sign in with Google
                </button>
                <button
                    onClick={() => signIn("github")}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded transition duration-200 ease-in-out"
                >
                    Sign in with GitHub
                </button>

            </div>
        </div>
    );
}
