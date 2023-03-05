import React from "react";
import { useHistory } from "react-router-dom";
import DeckMetaSummary from "../../molecules/DecksMetaSummary";
import AutosuggestSearch from "../../components/AutosuggestSearch";
import Footer from "../../components/Footer";
import { useFetch } from "../../hooks/useFetch";
import { grouppedFactions } from "../../data/wudb";
// import { AutosuggestSearch } from "./Search";

const Home = () => {
    const history = useHistory();
    const { result: stats } = useFetch('api/v1/public-decks/stats');

    const handleGlobalSearchClick = (payload) => {
        history.push(`/view/card/${payload.id}`);
    };

    return (
        <div className="flex flex-col relative">
            <h1 className="block text-2xl my-16 px-2 text-center text-white font-semibold">
                Deck building website for Warhammer Underworlds.
            </h1>

            <div className="mb-16 justify-center">
                <div className="mx-4 sm:mx-auto sm:w-1/2 lg:w-1/3">
                    {/* <AutosuggestSearch /> */}
                    <AutosuggestSearch onClick={handleGlobalSearchClick} />
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    grouppedFactions().slice(1).flatMap(({ factions }) => factions).map((faction) => (
                        <DeckMetaSummary
                            key={faction.abbr}
                            faction={faction.name}
                            stats={stats}
                        />
                    ))
                }
            </div>

            <Footer />
        </div>
    );
};

export default Home;
