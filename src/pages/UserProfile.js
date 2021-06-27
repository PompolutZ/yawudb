import React, { useEffect, useState } from "react";
import AvatarPicker from "../components/AvatarPicker";
import { useGetUserData, useUpdateUser } from "../hooks/wunderworldsAPIHooks";

function UserProfile() {
    const [{ data, error, loading }, refetch] = useGetUserData();
    const [, update] = useUpdateUser();
    const [username, setUsername] = useState(data ? data.displayName : '');
    const [avatar, setAvatar] = useState(data ? data.avatar : '');

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

    const save = () => {
        update({ data: {
            displayName: username,
            avatar: avatar
        }})
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
                    disabled={!avatar || !username}
                    onClick={save}>
                    Save
                </button>
            </div>
        </div>
        // <div
        //     style={{
        //         display: "flex",
        //         flexFlow: "column wrap",
        //         alignItems: "center",
        //         maxWidth: "800px",
        //         background: "white",
        //     }}
        // >
        //     <div style={{ margin: "0 0 0 1rem" }}>
        //         <div
        //             style={{
        //                 margin: "0 0 0 .7rem",
        //                 fontSize: ".7rem",
        //                 color: "gray",
        //             }}
        //         >
        //             Pick your avatar image:
        //         </div>
        //         <AvatarPicker
        //             onSelectionChange={this.handleAvatarChange}
        //             defaultAvatar={this.state.avatar}
        //         />
        //     </div>
        //     <TextField
        //         id="with-placeholder"
        //         label="Profile name"
        //         value={this.state.userName}
        //         margin="none"
        //         onChange={this.handleUseNameChange}
        //         style={{ margin: "1rem auto", minWidth: "20rem" }}
        //     />
        //     <Typography
        //         style={{ margin: "0 1rem 1rem 1.8rem", minWidth: "20rem" }}
        //     >
        //         Note: Your profile name will be visible to others as an author
        //         name for the decks you've made.
        //     </Typography>

        //     {/* <Typography
        //         variant="subtitle2"
        //         style={{ margin: "0 1rem 0 1.8rem", minWidth: "20rem" }}
        //     >
        //         Mark which sets and how many of them you own. This
        //         information is required for you to use "Find conflicts in
        //         your decks" feature.
        //     </Typography>
        //     <div
        //         style={{
        //             display: "flex",
        //             flexFlow: "row wrap",
        //             justifyContent: "space-evenly",
        //         }}
        //     >
        //         {setsIndex.map((s, i) => (
        //             <StyledExpansionCounter
        //                 key={s}
        //                 set={i}
        //                 count={this.state.expansions[i]}
        //             />
        //         ))}
        //     </div> */}
        //     <Button style={{ margin: "1rem auto" }} onClick={this.handleSave}>
        //         Save
        //     </Button>

        //     <Button style={{ color: "red" }} onClick={this.handleDeleteCache}>
        //         Delete Cache
        //     </Button>
        //     <Typography
        //         variant="subtitle2"
        //         style={{ margin: "0 1rem 0 1.8rem", minWidth: "20rem" }}
        //     >
        //         Experimental attempt to make dirty clean up.
        //     </Typography>
        // </div>
    );
}

// class UserProfile extends Component {
//     state = {
//         userName:
//             !this.props.userInfo !== null
//                 ? this.props.userInfo.displayName
//                 : "",
//         avatar: this.props.userInfo.avatar,
//         expansions: this.props.expansions,
//     };

//     render() {}

//     handleUseNameChange = (e) => {
//         this.setState({ userName: e.target.value });
//     };

//     handleAvatarChange = (avatar) => {
//         this.setState({ avatar: avatar });
//     };

//     handleCounterChange = (set, count) => {
//         this.setState(
//             (state) => ({
//                 expansions: { ...state.expansions, ...{ [set]: count } },
//             }),
//             () => {}
//         );
//     };

//     handleDeleteCache = () => {
//         var yawudbKeys = keys(localStorage).filter((key) =>
//             key.startsWith("yawudb")
//         );
//         for (let k of yawudbKeys) {
//             localStorage.removeItem(k);
//         }
//         localStorage.removeItem("state");
//     };

//     handleSave = async () => {
//         const userRef = this.props.firebase.db
//             .collection("users")
//             .doc(this.props.userInfo.uid);
//         const cache = JSON.parse(localStorage.getItem("yawudb_decks")) || {};
//         try {
//             await userRef.update({
//                 displayName: this.state.userName,
//                 avatar: this.state.avatar,
//                 expansions: this.state.expansions,
//             });
//             for (let [key, value] of Object.entries(this.props.mydecks)) {
//                 const updatedDeck = {
//                     ...value,
//                     authorDisplayName: this.state.userName,
//                     created: Date(),
//                 };
//                 localStorage.setItem(
//                     "yawudb_decks",
//                     JSON.stringify({ ...cache, [key]: updatedDeck })
//                 );
//             }
//             this.props.setUser({
//                 ...this.props.userInfo,
//                 displayName: this.state.userName,
//                 avatar: this.state.avatar,
//             });
//             this.props.updateUserExpansions(this.state.expansions);
//         } catch (err) {
//             console.error("ERROR_UPDATE_PROFILE", err);
//         }
//     };
// }

// const mapStateToProps = (state) => {
//     return {
//         userInfo: state.auth,
//         expansions: state.userExpansions,
//         mydecks: state.mydecks,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setUser: (user) => dispatch({ type: "SET_USER", user: user }),
//         updateUserExpansions: (expansions) =>
//             dispatch({ type: UPDATE_EXPANSIONS, payload: expansions }),
//     };
// };

export default UserProfile;
