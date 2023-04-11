import React from "react";
// Next Components
import Link from "next/link";
// Icons
import { FaQuoteLeft } from "react-icons/fa";
import { SlSocialLinkedin } from "react-icons/sl";
import { TfiInstagram } from "react-icons/tfi";
import { VscGithubAlt } from "react-icons/vsc";
import { IoMdLink } from "react-icons/io";

const About = () => {
  const data = [
    {
      name: "Akshat Soni",
      img: "/team/akshat.jpg",
      quote:
        "It's not the will to win that matters.It's the will to prepare to win that matters.",
      instagram: "https://www.instagram.com/akshat_210/",
      linkedin: "https://www.linkedin.com/in/akshat-soni-b49b27240",
      portfolio: "mailto:sakshat551@gmail.com",
      github: "https://github.com/AkshatSoni1",
    },
    {
      name: "Deepak Singh",
      img: "/team/deepak.jpg",
      quote:
        "Winning is enjoyable only when people are eagerly anticipating your defeat.",
      instagram: "https://www.instagram.com/___deepak___0503/",
      linkedin: "https://www.linkedin.com/in/deepak-singh-9a0211211/",
      portfolio: "mailto:deepaksingh052003@gmail.com",
      github: "https://github.com/deepaksingh0503/",
    },
    {
      name: "Harsh Jaiswani",
      img: "/team/harsh.jpg",
      quote:
        "We don't stop playing because we grow old, we grow old because we stop playing.",
      instagram: "",
      linkedin: "https://www.linkedin.com/in/harsh-jaiswani-26108823b/",
      portfolio: "mailto:harshjaiswani2003@gmail.com",
      github: "https://github.com/HarshJaiswani",
    },
    {
      name: "B. Lohit Kumar",
      img: "/team/lohit.jpg",
      quote:
        "When life gives you a second chance then make complete use of it.",
      instagram: "https://www.instagram.com/who.lohitt/",
      linkedin: "https://www.linkedin.com/in/lohit-kumar-1851ba271/",
      portfolio: "mailto:lohitrock290503@gmail.com",
      github: "https://github.com/Lohitkumarr",
    },
  ];
  return (
    <div className="w-full p-5 sm:p-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 my-4 font-semibold text-center flex flex-wrap items-center justify-center">
        Humari Kahani{" "}
        <div className="relative w-fit mx-8">
          <div className="w-[130px] sm:w-[150px] md:w-[200px] h-[10px] md:h-[15px] bg-[yellow] absolute z-[-1] bottom-0 md:left-[-25px] left-[-15px] rounded"></div>
          (Our Story)
        </div>
      </h2>
      <div className="my-8">
        <h3 className="text-xl sm:text-2xl text-center sm:text-left font-sans font-semibold mb-8">
          Note from <span className="text-teal-400">Creators</span>!
        </h3>
        <div className="flex items-center flex-wrap my-4 w-full justify-evenly">
          {data.map((member, index) => (
            <div
              key={index}
              className="p-4 m-4 flex items-start justify-between flex-col w-[250px] rounded-xl bg-gray-50 shadow -rotate-2 hover:rotate-0 min-h-[300px]"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 mr-4 rounded-full shadow bg-gray-200 overflow-hidden flex items-center justify-center">
                  <img src={member.img} alt="" />
                </div>
                <h6 className="font-semibold font-sans text-slate-500 tracking-wider">
                  {member.name}
                </h6>
              </div>
              <div className="my-4">
                <FaQuoteLeft className="text-gray-300" />
                <p className="mt-2 text-teal-500 ml-4 font-mono">
                  {member.quote}
                </p>
              </div>
              <div className="w-full text-slate-400 text-xl flex items-center justify-evenly border-t py-4">
                <Link href={member.linkedin} target="_blank">
                  <SlSocialLinkedin className="hover:text-yellow-300" />
                </Link>
                <Link href={member.instagram} target="_blank">
                  <TfiInstagram className="hover:text-yellow-300" />
                </Link>
                <Link href={member.github} target="_blank">
                  <VscGithubAlt className="hover:text-yellow-300" />
                </Link>
                <Link href={member.portfolio} target="_blank">
                  <IoMdLink className="text-2xl hover:text-yellow-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-12 sm:my-24 flex items-center lg:flex-row flex-col-reverse">
        <div className="w-full lg:w-1/2 sm:pr-8 text-gray-500">
          <h2 className="text-2xl font-semibold text-red-400 my-2">
            Our History
          </h2>
          <p className="mb-8">
            We are passionate college students pursuing Btech, we had a very
            stong desire to solve this problem of people wanting to play but are
            unable as they were unaware of the opportunities around them we
            faciliate them by connecting them to the orgaisers of the games
            which altogether opens numerous opprotunities for oragnisers as well
            as they can organise their games easily without any hustle bustle!
          </p>
          <h2 className="text-2xl font-semibold text-red-400 my-2">
            Our Vision
          </h2>
          <p>
            Our vision is create a community of players from all over India be
            it gali player or a pro player we will have place for each and
            everybody whoever wants to play be it professionally or just for fun
            we cover them all, also over few years we want to expand this
            platform to every game possible and organise and encourgae sports
            culture in India be it online gamming or the physcial sports
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full h-[200px] sm:h-[300px] mb-8 lg:mb-auto bg-gray-50 shadow rounded-xl overflow-hidden">
            <img src="/team/team2.jpg" className="w-full h-full" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
