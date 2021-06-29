import React, { useEffect, useState } from "react";
import AvatarPicker from "../components/AvatarPicker";
import { useCreateUser, useGetUserData, useUpdateUser } from "../hooks/wunderworldsAPIHooks";

const prefixes = ['Doom of', 'Curse of', 'Nemesis of', 'Salvation of'];
const postfixes = ['Beastgrave', 'Shadespire', 'Kathophranes', 'Direchasm', 'Ghur'];
const random = max => Math.floor(Math.random() * Math.floor(max))

function UserProfile() {
    const [{ data, loading }, refetch] = useGetUserData();
    const [, create] = useCreateUser();
    const [, update] = useUpdateUser();
    const [username, setUsername] = useState(data ? data.displayName : `${prefixes[random(prefixes.length - 1)]} ${postfixes[random(postfixes.length - 1)]}`);
    const [avatar, setAvatar] = useState(data ? data.avatar : 'elathains-soulreapers');

    useEffect(() => {
        refetch();
    }, [refetch])

    const changeName = (e) => {
        setUsername(e.target.value);
    };

    const handleAvatarChange = (e) => {
        setAvatar(e);
    };

    useEffect(() => {
        if(!data) return;

        setUsername(data.displayName);
        if (data.avatar.includes("/")) {
            const [icon] = data.avatar.split("/").slice(-1);
            const a = icon.split('-icon.png')[0];
            console.log(a)
            setAvatar(a);
        } else {
            setAvatar(data.avatar);
        }
    }, [data])

    const save = async () => {
        if (data) {
            await update({ data: {
                displayName: username,
                avatar: avatar
            }});
        } else {
            await create({ data: {
                displayName: username,
                avatar: avatar
            }});
        }
        refetch();
    }

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                Hang on please...
            </div>
        );
    }

    return (
        <div className="flex-1 text-gray-900">
            <div className="w-full sm:w-2/4 lg:w-1/4 mx-auto p-4 space-y-4">
                <h1 className="text-xl">Your profile</h1>
                <section>
                    <h2 className="mb-2">Username</h2>
                    <input
                        onChange={changeName}
                        placeholder="Username"
                        value={username}
                        className="px-3 py-2 w-full border border-purple-300 focus:ring focus:ring-purple-500 focus:outline-none"
                    />
                </section>

                <section>
                    <h2 className="mb-2">Avatar</h2>
                    <AvatarPicker
                        current={avatar}
                        onSelectionChange={handleAvatarChange}
                    />
                </section>

                <button className="w-full focus:bg-purple-500 btn btn-purple mr-8 cursor-pointer hover:font-semibold px-4 py-2 font-bold"
                    disabled={(!avatar || !username) || (data && data.displayName === username && data.avatar === avatar)}
                    onClick={save}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default UserProfile;
