import React from "react";
// Custom Components
import EventCard from "../components/EventCard";
import RankCard from "../components/RankCard";
// Icons
import { AiFillHeart } from "react-icons/ai";

const dataUser = Array(5).fill({
  id: 5,
  name: "Harsh Jaiswani",
  email: "dummyemail@gmail.com",
  age: 20,
  gender: "Male",
  sports: ["Cricket", "Football"],
  stake: "organiser,participant",
  organiser_rank: 52,
  participant_rank: 63,
  profile_pic: "",
  events_participated: 5,
  events_oraganised: 2,
  prices_won: 1,
  overall_ranking: 2, //every event will have a rating of 5 then average of all the events of a organiser is ranking
});

const data = Array(5).fill({
  id: 5,
  title: "Event name",
  shortDescp:
    "jkncjsn kcjnjks ncjknsj kncksnc nsnjc ndcdjk ndjwnkdnm ksncjn slndcldn lkwnml cnrh nlmc kammk dcs",
  longDescp:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo vero quia quae dolorem sapiente alias harum consectetur iure adipisci non voluptatibus nulla, inventore, dicta laboriosam. Hic numquam eum accusantium velit asperiores libero voluptate laboriosam, tenetur, aut corrupti voluptatum dolor esse atque eos! Dolorum voluptate eos incidunt exercitationem ad temporibus sint consectetur earum?",
  mode: "online",
  date: "",
  timing: "",
  organiser: "harsh jaiswani",
  type: "sport",
  sport: "Cricket",
  location: null,
  platform: "Dream11",
  rewards: "price will be displyed here",
  registrationFee: null,
  isActive: true,
  eligibility: "if any eligibility will be show here",
});

const Profile = () => {
  return (
    <div className="p-5 sm:p-12 bg-gray-50">
      <div className="flex items-center flex-col md:flex-row">
        <div className="w-36 h-36 rounded-full shadow bg-gray-200"></div>
        <div className="mx-0 md:mx-8 mt-4 md:mt-0">
          <div className="flex items-center sm:flex-row flex-col">
            <h2 className="text-2xl font-semibold text-blue-400 mr-4">
              Harsh Jaiswani
            </h2>
            <div className="flex items-center justify-start my-4 sm:my-0">
              <div className="px-4 py-1 text-sm rounded-lg bg-yellow-200 mr-4">
                Oragniser
              </div>
              <div className="px-4 py-1 text-sm rounded-lg bg-yellow-200">
                Participant
              </div>
            </div>
          </div>
          {/* to show email only when user is viewing his or her profile not in general profile */}
          <p className="text-gray-400 w-fit mx-auto sm:mx-0">
            dummyemail@emial.com
          </p>
          <div className="my-4 flex items-center justify-start flex-wrap">
            <div className="px-6 py-2 rounded-full bg-gray-100 font-semibold font-sans text-green-400 mr-4 mb-4">
              Cricket
            </div>
            <div className="px-6 py-2 rounded-full bg-gray-100 font-semibold font-sans text-green-400 mr-4 mb-4">
              PubG
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 sm:my-8">
        <h2 className="flex items-center justify-between">
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block whitespace-nowrap mr-4 text-gray-600 font-semibold my-4">
            Overall Rank
          </span>
          <div className="w-[80%] h-0.5 bg-gray-200"></div>
        </h2>
        <RankCard type="oragniser" user={dataUser[0]} theme="light" />
      </div>
      {/* <RankCard type="participant" user={dataUser[0]} theme="light" /> */}
      <h2 className="flex items-center justify-between">
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block whitespace-nowrap mr-4 text-gray-600 font-semibold my-4">
          Current Participations
        </span>
        <div className="w-[70%] h-0.5 bg-gray-200"></div>
      </h2>
      <ul className="w-full sm:w-4/5 mx-auto flex items-center justify-evenly flex-wrap">
        {data.map((post) => (
          <EventCard key={post.id} post={post} />
        ))}
      </ul>
      <h2 className="flex items-center justify-between" id="pastevents">
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block whitespace-nowrap mr-4 text-gray-600 font-semibold my-4">
          Past Participations
        </span>
        <div className="w-[70%] h-0.5 bg-gray-200"></div>
      </h2>
      <ul className="w-full sm:w-4/5 mx-auto flex items-center justify-evenly flex-wrap">
        {data.map((post) => (
          <EventCard key={post.id} post={post} />
        ))}
      </ul>
      <h2 className="flex items-center justify-between" id="wishevents">
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block whitespace-nowrap text-gray-600 font-semibold my-4">
          <AiFillHeart className="inline text-[red] mb-2 mr-2" />
          WishList
        </span>
        <div className="w-[80%] h-0.5 bg-gray-200"></div>
      </h2>
      <ul className="w-full sm:w-4/5 mx-auto flex items-center justify-evenly flex-wrap">
        {data.map((post) => (
          <EventCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Profile;
